import { ENV } from "../../config/env";
import { jwtDecode } from "jwt-decode";
import { tokenStorage } from "../auth/tokenStorage";

// ======================
// Tipos
// ======================
type ReqOptions = {
  method?: 'GET'|'POST'|'PUT'|'PATCH'|'DELETE';
  body?: any;
  headers?: Record<string, string>;
  token?: string | null;     // (DEPRECATED) Se mantiene por compatibilidad
  skipAuth?: boolean;        // (NEW) Evita adjuntar Authorization
};

type Tokens = { accessToken: string; refreshToken: string };

// ======================
// Utils (logs + parseo)
// ======================

// enmascara campos sensibles antes de imprimir en consola
function maskPayload(payload: any) {
  if (!payload || typeof payload !== 'object') return payload;
  const SENSITIVE_KEYS = ['password','pwd','pass','token','access_token','refresh_token','code'];
  const clone: any = Array.isArray(payload) ? [...payload] : { ...payload };

  for (const k of Object.keys(clone)) {
    if (SENSITIVE_KEYS.includes(k.toLowerCase())) {
      clone[k] = '***';
    } else if (clone[k] && typeof clone[k] === 'object') {
      clone[k] = maskPayload(clone[k]);
    }
  }
  return clone;
}

// parsea respuesta y lanza error si no es OK
async function handle<T>(res: Response, startedAt: number, fullUrl: string, method: string): Promise<T> {
  const elapsed = Date.now() - startedAt;
  const rawText = await res.text();
  let data: any;

  try { data = rawText ? JSON.parse(rawText) : {}; } 
  catch { data = { message: rawText }; }

  if (ENV.DEBUG_HTTP) {
    console.debug(`📥 [HTTP ${method}] ${fullUrl} → ${res.status} ${res.statusText} (${elapsed}ms)`);
    if (!res.ok) console.debug('🧾 Response body (raw):', rawText || '<empty>');
    else console.debug('🧾 Response (parsed):', data);
  }

  if (!res.ok) {
    const message = data?.message || `HTTP ${res.status} ${res.statusText}`;
    const err = new Error(message) as any;
    err.status = res.status;
    err.statusText = res.statusText;
    err.url = fullUrl;
    err.body = rawText;
    throw err;
  }

  return data as T;
}

// ======================
// JWT helpers
// ======================
type JwtPayload = { exp?: number; iat?: number; [k: string]: any };

function decodeExp(token: string): number | null {
  try {
    const p = jwtDecode<JwtPayload>(token);
    return typeof p.exp === 'number' ? p.exp : null;
  } catch {
    return null;
  }
}

/** true si ya venció o vence en <= skewSeconds */
function isJwtExpired(token: string, skewSeconds: number = 30): boolean {
  const exp = decodeExp(token);
  if (!exp) return false; // si no hay exp, no forzamos expiración
  const now = Math.floor(Date.now() / 1000);
  return now >= (exp - skewSeconds);
}

// ======================
// Refresh (único en vuelo)
// ======================
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;
let waitingQueue: Array<(t: string | null) => void> = [];

/** Llama a /auth/refresh con el refreshToken y guarda los nuevos tokens */
async function doRefresh(): Promise<string | null> {
  const refreshToken = await tokenStorage.getRefreshToken();
  if (!refreshToken) return null;

  // Si el RT es también JWT y expiró, no intentes
  if (isJwtExpired(refreshToken, 5)) {
    await tokenStorage.clearTokens();
    return null;
  }

  const url = `${ENV.API_BASE}${ENV.TOKEN_ENDPOINTS.REFRESH}`;
  if (ENV.DEBUG_HTTP) console.debug(`🔁 [REFRESH] POST ${url}`);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  const startedAt = Date.now(); // solo para mantener el patrón, no medimos aquí

  if (!res.ok) {
    if (ENV.DEBUG_HTTP) {
      const raw = await res.text();
      console.error("🔁 [REFRESH] failed:", raw || "<empty>");
    }
    await tokenStorage.clearTokens();
    return null;
  }

  const data = await res.json() as Tokens;
  const tokens: Tokens = {
    accessToken: (data as any).accessToken,
    refreshToken: (data as any).refreshToken,
  };
  await tokenStorage.saveTokens(tokens);

  if (ENV.DEBUG_HTTP) {
    const exp = decodeExp(tokens.accessToken);
    console.debug(`🔁 [REFRESH] success, access exp: ${exp ? new Date(exp * 1000).toISOString() : "n/a"}`);
  }

  return tokens.accessToken;
}

/** Devuelve un access token válido; refresca proactivamente si faltan <=30s */
async function ensureFreshAccessToken(): Promise<string | null> {
  if (isRefreshing && refreshPromise) return refreshPromise;

  const token = await tokenStorage.getAccessToken();
  if (!token) return null;

  if (isJwtExpired(token, 30)) {
    isRefreshing = true;
    refreshPromise = doRefresh().finally(() => { isRefreshing = false; });
    return refreshPromise;
  }
  return token;
}

/** Maneja 401: asegura refresh único y reintenta el callback que hace la petición */
async function retryAfterRefresh<T>(cb: (newToken: string) => Promise<T>): Promise<T> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = doRefresh().finally(() => { isRefreshing = false; });

    const newToken = await refreshPromise;
    waitingQueue.forEach(fn => fn(newToken));
    waitingQueue = [];

    if (!newToken) {
      await tokenStorage.clearTokens();
      throw Object.assign(new Error("Unauthorized"), { status: 401 });
    }
    return cb(newToken);
  }

  // Ya hay refresh en curso → encola y espera
  return new Promise<T>((resolve, reject) => {
    waitingQueue.push(async (newToken) => {
      if (!newToken) {
        reject(Object.assign(new Error("Unauthorized"), { status: 401 }));
        return;
      }
      try {
        const out = await cb(newToken);
        resolve(out);
      } catch (e) { reject(e); }
    });
  });
}

// ======================
// request(): principal
// ======================
export async function request<T>(path: string, opts: ReqOptions = {}): Promise<T> {
  const method = opts.method || 'GET';
  const fullUrl = `${ENV.API_BASE}${path}`;

  // Headers base
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(opts.headers || {}),
  };

  // === Autenticación ===
  // (1) si skipAuth → NO adjunta Authorization
  // (2) si opts.token (DEPRECATED) → úsalo directo
  // (3) si no hay token explícito → lee del storage y refresca si es necesario
  let authToken: string | null = null;

  if (!opts.skipAuth) {
    if (opts.token) {
      authToken = opts.token; // compat
    } else {
      authToken = await ensureFreshAccessToken();
    }
    if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
  }

  if (ENV.DEBUG_HTTP) {
    console.debug(`🌍 [HTTP ${method}] ${fullUrl}`);
    const printable = { ...headers, Authorization: headers.Authorization ? 'Bearer ***' : undefined };
    console.debug('🧩 Headers:', printable);
    if (opts.body) console.debug('📤 Payload:', maskPayload(opts.body));
  }

  const startedAt = Date.now();

  try {
    const res = await fetch(fullUrl, {
      method,
      headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    });

    // 200-299 → OK
    if (res.ok) return await handle<T>(res, startedAt, fullUrl, method);

    // 401 → intenta refresh y reintenta (si no es público)
    if (res.status === 401 && !opts.skipAuth) {
      return retryAfterRefresh<T>(async (newToken) => {
        const retryHeaders = { ...headers, Authorization: `Bearer ${newToken}` };
        const retryRes = await fetch(fullUrl, {
          method,
          headers: retryHeaders,
          body: opts.body ? JSON.stringify(opts.body) : undefined,
        });
        return handle<T>(retryRes, startedAt, fullUrl, method);
      });
    }

    // Otros códigos → manejar como antes
    return await handle<T>(res, startedAt, fullUrl, method);
  } catch (e: any) {
    const elapsed = Date.now() - startedAt;
    if (ENV.DEBUG_HTTP) {
      console.error(`❌ [HTTP ${method}] ${fullUrl} (network error, ${elapsed}ms)`);
      console.error('🧯 Error:', e?.message || e);
    }
    const err = new Error(e?.message || 'Network error') as any;
    err.code = 'NETWORK_ERROR';
    err.url = fullUrl;
    err.method = method;
    throw err;
  }
}
