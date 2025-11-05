/// <summary>
/// Interfaz del perfil del usuario actual (puedes expandirla según tus campos reales).

import { createContext } from "react";

/// </summary>
export interface UserProfile {
  id: number;
  userName: string;
  email?: string;
  phoneNumber?: string;
  photoUrl?: string;
  roles: Array<{
    id: number;
    name: string;
    description: string;
  }>;
  permissions: Array<{
    id: number;
    name: string;
    description: string;
  }>;
  currentProfile: {
    personId: number;
    personName: string;
    divisionName: string;
    profileName: string;
    qrCode: string;
  };
}

/// <summary>
/// Contexto global que almacena la información del usuario autenticado.
/// </summary>
interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
  fetchUserData: () => Promise<void>;
  clearUser: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  loading: false,
  fetchUserData: async () => {},
  clearUser: async () => {},
});

export interface UserResponse {
  id?: number | undefined;
  userName?: string;
  email?: string;
  roles?: { id: number; name: string }[];
  permissions?: { id: number; name: string }[];
  currentProfile?: {
    personName: string;
    profileName: string;
    divisionName: string;
  };
}