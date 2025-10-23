import { ENV } from '../../config/env';
import { HttpMethod } from './types';

export async function parseResponse<T>(res: Response): Promise<T> {
  const text = await res.text();
  try { return text ? JSON.parse(text) as T : ({} as T); }
  catch { return { message: text } as unknown as T; }
}

export function maskPayload(payload: any) {
  if (!payload || typeof payload !== 'object') return payload;
  const SENSITIVE = ['password','pwd','pass','token','access_token','refresh_token','code'];
  const clone: any = Array.isArray(payload) ? [...payload] : { ...payload };
  for (const k of Object.keys(clone)) {
    if (SENSITIVE.includes(k.toLowerCase())) clone[k] = '***';
    else if (clone[k] && typeof clone[k] === 'object') clone[k] = maskPayload(clone[k]);
  }
  return clone;
}

export async function doFetch(
  url: string,
  method: HttpMethod,
  headers: Record<string, string>,
  body?: any
) {
  if (ENV.DEBUG_HTTP) {
    console.debug(`🌍 [HTTP ${method}] ${url}`);
    const printable = { ...headers, Authorization: headers.Authorization ? 'Bearer ***' : undefined };
    console.debug('🧩 Headers:', printable);
    if (body) console.debug('📤 Payload:', maskPayload(body));
  }

  return fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
}
