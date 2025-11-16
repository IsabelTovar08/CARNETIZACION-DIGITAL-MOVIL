import * as SignalR from "@microsoft/signalr";
import { tokenStorage } from "../../auth/tokenStorage";
import { ENV } from '../../../config/env';
import { showNotificationBanner } from "../utils/notificationSound";

/// <summary>
/// Servicio WebSocket para escuchar notificaciones en tiempo real.
/// </summary>
class NotificationHub {
    private hub: SignalR.HubConnection | null = null;
    private listeners: Array<(data: any) => void> = [];

    /// <summary>
    /// Conectar al NotificationHub.
    /// </summary>
    async connect() {
        const token = await tokenStorage.getAccessToken();
        if (!token) return;

        if (this.hub && this.hub.state === SignalR.HubConnectionState.Connected) {
            return;
        }

        this.hub = new SignalR.HubConnectionBuilder()
            .withUrl(`${ENV.URL_BASE}/hubs/notifications`, {
                accessTokenFactory: () => token
            })
            .withAutomaticReconnect()
            .build();


        // escuchar mensajes
        this.hub.on("ReceiveNotification", (data) => {
            console.log("📩 Notificación recibida en WebSocket:", data);
              showNotificationBanner(data.title ?? "Notificación", data.message ?? "");
            this.listeners.forEach((cb) => cb(data));
        });

        try {
            await this.hub.start();
            console.log("🟢 WebSocket conectado a NotificationHub");
        } catch (error) {
            console.error("🔴 Error al conectar al hub:", error);
        }
    }

    /// <summary>
    /// Suscribir un callback para notificaciones en tiempo real.
    /// </summary>
    subscribe(callback: (data: any) => void) {
        this.listeners.push(callback);
    }

    /// <summary>
    /// Desconectar
    /// </summary>
    async disconnect() {
        if (this.hub) {
            await this.hub.stop();
            this.hub = null;
        }
    }
}

export const notificationHub = new NotificationHub();
