/// <summary>
/// Contexto global y provider para manejar la información del usuario autenticado.
/// Usa AsyncStorage para persistencia local y el servicio UserService para obtener los datos.
/// </summary>

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserProfile, UserResponse } from "../../models/userProfile";
import { UserService } from "../http/security/UserService";
import { NotificationService } from "../http/Notifications/NotificationService";
import { notificationStore } from "../http/Notifications/NotificationStore";

/// <summary>
/// Definición del tipo de contexto para TypeScript.
/// </summary>
type UserContextType = {
    user: UserProfile | null;
    loading: boolean;
    loadCurrentUser: () => Promise<void>;
    clearUser: () => Promise<void>;
    hasRole: (roleName: string) => boolean;
};

/// <summary>
/// Contexto principal que almacena la información del usuario.
/// </summary>
export const UserContext = createContext<UserContextType>({
    user: null,
    loading: false,
    loadCurrentUser: async () => { },
    clearUser: async () => { },
    hasRole: (roleName: string) => false,
});

/// <summary>
/// Hook personalizado para consumir el contexto del usuario.
/// </summary>
export const useUser = () => useContext(UserContext);

/// <summary>
/// Provider que expone la data del usuario a toda la aplicación.
/// </summary>
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const userService = new UserService<UserResponse>();
    const notificationService = new NotificationService<any, any>();

    /// <summary>
    /// Obtiene la información del usuario actual desde el backend y la guarda localmente.
    /// Endpoint esperado: GET /api/user/me
    /// </summary>
    const loadCurrentUser = async () => {
        try {
            setLoading(true);
            const response = await userService.getCurrentUser();

            if (response?.data) {
                console.log("✅ Usuario autenticado:", response.data);
                setUser(response.data);
                await AsyncStorage.setItem("user", JSON.stringify(response.data));
            } else {
                console.warn("⚠️ No se recibió data del endpoint /api/user/me");
            }
        } catch (error) {
            console.error("❌ Error al obtener el usuario:", error);
        } finally {
            setLoading(false);
        }
    };

    /// <summary>
    /// Limpia la información del usuario (por ejemplo, al cerrar sesión).
    /// </summary>
    const clearUser = async () => {
        try {
            setUser(null);
            await AsyncStorage.removeItem("user");
            console.log("🚮 Usuario limpiado de AsyncStorage");
        } catch (error) {
            console.error("❌ Error al limpiar usuario:", error);
        }
    };

    /// <summary>
    /// Verifica si el usuario actual tiene un rol específico.
    /// Ejemplo: hasRole("SuperAdmin")
    /// </summary>
    const hasRole = (roleName: string): boolean => {
        return user?.roles?.some((r: any) => r.name === roleName) ?? false;
    };


    /// <summary>
    /// Al iniciar la app, intenta cargar el usuario almacenado localmente desde AsyncStorage.
    /// Si no existe, consulta el endpoint para obtenerlo.
    /// </summary>
    useEffect(() => {
        (async () => {
            try {
                const stored = await AsyncStorage.getItem("user");

                if (stored) {
                    const parsed = JSON.parse(stored);
                    setUser(parsed);
                    console.log("📦 Usuario cargado desde AsyncStorage:", parsed.userName);
                } else {
                    console.log("⚠️ No hay usuario en AsyncStorage. Consultando backend...");
                    await loadCurrentUser();
                }
                const total = await notificationService.getCount();
                notificationStore.set(total);

            } catch (error) {
                console.error("❌ Error al cargar usuario inicial:", error);
            }
        })();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                loading,
                loadCurrentUser,
                clearUser,
                hasRole,
            }}
        >
            {children}
        </UserContext.Provider>
    );

};
