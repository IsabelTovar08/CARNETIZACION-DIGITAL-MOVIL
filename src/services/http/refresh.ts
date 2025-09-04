// Coordinación de refresh (único en vuelo) + helpers de auth.

import { ENV } from '../../config/env';
import { Tokens } from '../../types/auth';
import { tokenStorage } from '../auth/tokenStorage';
import { parseResponse } from './core';
import { decodeJwt, isJwtExpired } from './utils/jwt';

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;
let queue: Array<(t: string | null) => void> = [];

/** (ES) Llama a /auth/refresh con el refreshToken y guarda los nuevos tokens */
async function doRefresh(): Promise<string | null> {
  const refreshToken = await tokenStorage.getRefreshToken();
  if (!refreshToken) return null;

  // Si el RT es JWT y ya venció, no intentes.
  const rtPayload = decodeJwt(refreshToken);
  if (rtPayload?.exp && isJwtExpired(refreshToken, 5)) {
    await tokenStorage.clearTokens();
    return null;
  }

  const url = `${ENV.API_BASE}${ENV.TOKEN_ENDPOINTS.REFRESH}`;
  if (ENV.DEBUG_HTTP) console.debug(`🔁 [REFRESH] POST ${url}`);

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    const bad = await parseResponse<any>(res);
    if (ENV.DEBUG_HTTP) console.error('🔁 [REFRESH] failed:', bad);
    await tokenStorage.clearTokens();
    return null;
  }

  const data = await parseResponse<{ accessToken: string; refreshToken: string }>(res);
  const tokens: Tokens = { accessToken: (data as any).accessToken, refreshToken: (data as any).refreshToken };
  await tokenStorage.saveTokens(tokens);

  if (ENV.DEBUG_HTTP) {
    const at = decodeJwt(tokens.accessToken);
    console.debug(`🔁 [REFRESH] success, access exp: ${at?.exp ? new Date(at.exp*1000).toISOString() : 'n/a'}`);
  }
  return tokens.accessToken;
}

/** (ES) Devuelve un access token válido; refresca proactivamente si faltan <=30s */
export async function ensureFreshAccessToken(): Promise<string | null> {
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

/** (ES) Maneja 401: asegura refresh único y reintenta el callback que hace la petición */
export async function retryAfterRefresh<T>(cb: (newToken: string) => Promise<T>): Promise<T> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = doRefresh().finally(() => { isRefreshing = false; });
    const newToken = await refreshPromise;
    queue.forEach(fn => fn(newToken));
    queue = [];

    if (!newToken) {
      await tokenStorage.clearTokens();
      throw Object.assign(new Error('Unauthorized'), { status: 401 });
    }
    return cb(newToken);
  }

  // Ya hay refresh en curso → encola y espera
  return new Promise<T>((resolve, reject) => {
    queue.push(async (newToken) => {
      if (!newToken) {
        reject(Object.assign(new Error('Unauthorized'), { status: 401 }));
        return;
      }
      try {
        const out = await cb(newToken);
        resolve(out);
      } catch (e) { reject(e); }
    });
  });
}
