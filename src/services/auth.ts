import * as SecureStore from 'expo-secure-store';
import { request } from './api';

const TOKEN_KEY = 'auth_token';

type LoginResponse =
  | { ok: true; token: string; user?: any }
  | { access_token: string; user?: any }
  | { token: string; user?: any }
  | { ok: boolean; message?: string; [k: string]: any };

export async function login(email: string, password: string) {
  const url = '/Auth/login';
  console.log("🌍 URL llamada:", url);
  console.log("📤 Payload enviado:", { email, password });

  try {
    const data = await request<LoginResponse>(url, {
      method: 'POST',
      body: { email, password },
    });

    console.log("📥 Respuesta cruda:", data);

    // const token =
    //   (data as any)?.token ||
    //   (data as any)?.access_token;

    // console.log("🔑 Token detectado:", token);

    // if (!token) {
    //   const msg = (data as any)?.message || 'Credenciales inválidas.';
    //   console.warn("⚠️ Login fallido:", msg);
    //   throw new Error(msg);
    // }

    // await SecureStore.setItemAsync(TOKEN_KEY, token);
    // console.log("✅ Token guardado en SecureStore:", token);

    return {  user: data };
  } catch (error: any) {
    console.error("❌ Error al hacer login en:", url);
    console.error("📄 Detalle del error:", error?.message || error);
    throw error; // re-lanza el error para que lo manejes en la UI
  }
}

export async function getToken() {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  console.log("📦 Token recuperado de SecureStore:", token);
  return token;
}

export async function logout() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  console.log("🚪 Token eliminado de SecureStore");
}
