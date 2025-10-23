// Utilidades basadas en jwt-decode
import { jwtDecode } from 'jwt-decode';

export type JwtPayload = { exp?: number; iat?: number; [k: string]: any };

export function decodeJwt(token: string): JwtPayload | null {
  try { return jwtDecode<JwtPayload>(token); }
  catch { return null; }
}

/** true si ya venció (o vence en <= skewSeconds) */
export function isJwtExpired(token: string, skewSeconds: number = 30): boolean {
  const payload = decodeJwt(token);
  if (!payload?.exp) return false; // si no hay exp, no forzamos expiración
  const now = Math.floor(Date.now() / 1000);
  return now >= (payload.exp - skewSeconds);
}
