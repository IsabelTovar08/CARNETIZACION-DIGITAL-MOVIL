import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tokens } from '../../types/auth';

const ACCESS_TOKEN_KEY = 'auth_access_token';
const REFRESH_TOKEN_KEY = 'auth_refresh_token';

async function setItemSecure(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value, { keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK });
  } catch {
    // Fallback si SecureStore falla o no está disponible
    await AsyncStorage.setItem(key, value);
  }
}

async function getItemSecure(key: string) {
  try {
    const val = await SecureStore.getItemAsync(key);
    if (val !== null) return val;
    // Fallback
    return await AsyncStorage.getItem(key);
  } catch {
    return await AsyncStorage.getItem(key);
  }
}

async function deleteItemSecure(key: string) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch {
    await AsyncStorage.removeItem(key);
  }
}

export const tokenStorage = {
  async saveTokens(tokens: Tokens) {
    await setItemSecure(ACCESS_TOKEN_KEY, tokens.accessToken);
    await setItemSecure(REFRESH_TOKEN_KEY, tokens.refreshToken);
  },

  async getAccessToken(): Promise<string | null> {
    return await getItemSecure(ACCESS_TOKEN_KEY);
  },

  async getRefreshToken(): Promise<string | null> {
    return await getItemSecure(REFRESH_TOKEN_KEY);
  },

  async clearTokens() {
    await deleteItemSecure(ACCESS_TOKEN_KEY);
    await deleteItemSecure(REFRESH_TOKEN_KEY);
  },
};
