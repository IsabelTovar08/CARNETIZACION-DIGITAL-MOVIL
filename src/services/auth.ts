import * as SecureStore from 'expo-secure-store';
import { request } from './api';

const TOKEN_KEY = 'auth_token';

type LoginResponse =
  | { ok: true; token: string; user?: any }
  | { access_token: string; user?: any }
  | { token: string; user?: any }
  | { ok: boolean; message?: string; [k: string]: any };

export async function login(email: string, password: string) {
  const data = await request<LoginResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
  });

  const token =
    (data as any)?.token ||
    (data as any)?.access_token;

  if (!token) {
    // Si tu API devuelve { ok:false, message:"..." }
    const msg = (data as any)?.message || 'Credenciales inválidas.';
    throw new Error(msg);
  }

  await SecureStore.setItemAsync(TOKEN_KEY, token);
  return { token, user: (data as any)?.user };
}

export async function getToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function logout() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
