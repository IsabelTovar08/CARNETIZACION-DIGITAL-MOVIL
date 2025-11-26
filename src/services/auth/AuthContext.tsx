// auth/AuthContext.tsx
import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { tokenStorage } from '../auth/tokenStorage';
import { ensureFreshAccessToken } from '../http/request';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from './authService';

type AuthContextValue = {
  isAuthenticated: boolean;
  loading: boolean;     // nuevo: indica si está comprobando sesión
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  /// <summary>
  /// Al iniciar la app verifica si existe token válido o intenta refrescarlo.
  /// </summary>
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Intenta obtener o refrescar el token
        const token = await ensureFreshAccessToken();
        setIsAuthenticated(!!token);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      loading,
      signIn: () => setIsAuthenticated(true),
      signOut: async () => {
        // await tokenStorage.clearTokens();
        setIsAuthenticated(false);
        authService.logout()
        await AsyncStorage.clear();
      },
    }),
    [isAuthenticated, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
