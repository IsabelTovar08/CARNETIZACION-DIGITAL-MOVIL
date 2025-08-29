// configura tu base API
const API_BASE = 'http://192.168.137.1:8008/api'; // <- CAMBIA ESTO

type ReqOptions = {
  method?: 'GET'|'POST'|'PUT'|'PATCH'|'DELETE';
  body?: any;
  headers?: Record<string, string>;
  token?: string | null;
};

const DEBUG_HTTP = true; // activa/desactiva logs

// enmascara campos sensibles antes de imprimir en consola
function maskPayload(payload: any) {
  if (!payload || typeof payload !== 'object') return payload;
  const SENSITIVE_KEYS = ['password', 'pwd', 'pass', 'token', 'access_token', 'refresh_token'];
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

// parsea respuesta y lanza error con más contexto si no es OK
async function handle<T>(res: Response, startedAt: number, fullUrl: string, method: string): Promise<T> {
  const elapsed = Date.now() - startedAt;
  const rawText = await res.text();
  let data: any;

  try { data = rawText ? JSON.parse(rawText) : {}; } 
  catch { data = { message: rawText }; }

  if (DEBUG_HTTP) {
    console.debug(`📥 [HTTP ${method}] ${fullUrl} → ${res.status} ${res.statusText} (${elapsed}ms)`);
    if (!res.ok) {
      console.debug('🧾 Response body (raw):', rawText || '<empty>');
    } else {
      console.debug('🧾 Response (parsed):', data);
    }
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

export async function request<T>(path: string, opts: ReqOptions = {}): Promise<T> {
  const method = opts.method || 'GET';
  const fullUrl = `${API_BASE}${path}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(opts.headers || {}),
  };
  if (opts.token) headers['Authorization'] = `Bearer ${opts.token}`;

  if (DEBUG_HTTP) {
    console.debug(`🌍 [HTTP ${method}] ${fullUrl}`);
    console.debug('🧩 Headers:', headers);
    if (opts.body) {
      console.debug('📤 Payload:', maskPayload(opts.body));
    }
  }

  const startedAt = Date.now();

  try {
    const res = await fetch(fullUrl, {
      method,
      headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    });

    return await handle<T>(res, startedAt, fullUrl, method);
  } catch (e: any) {
    // errores de red / CORS / timeout
    const elapsed = Date.now() - startedAt;
    if (DEBUG_HTTP) {
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
