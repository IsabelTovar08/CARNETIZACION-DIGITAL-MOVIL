import * as SignalR from "@microsoft/signalr";
import { tokenStorage } from "../../auth/tokenStorage";
import { ENV } from '../../../config/env';
import { showNotificationBanner } from "../utils/notificationSound";
import { notificationStore } from "./NotificationStore";
import { ToastAndroid } from "react-native";

/// <summary>
/// Servicio WebSocket para escuchar notificaciones en tiempo real.
/// </summary>
class NotificationHub {
    private hub: SignalR.HubConnection | null = null;
    private listeners: Array<(data: any) => void> = [];
    private reconnecting = false;
    private userId: number | null = null;

    async connect(userId: number) {
        this.userId = userId;
        const token = await tokenStorage.getAccessToken();
        if (!token) return;

        if (this.hub && this.hub.state === SignalR.HubConnectionState.Connected) {
            return;
        }

        this.hub = new SignalR.HubConnectionBuilder()
            .withUrl(`${ENV.URL_BASE}/hubs/notifications`, {
                accessTokenFactory: () => token
            })
            .withAutomaticReconnect({
                nextRetryDelayInMilliseconds: retryContext => {
                    // retry en: 2s – 5s – 10s – 20s
                    return [2000, 5000, 10000, 20000][retryContext.previousRetryCount] ?? null;
                }
            })
            .build();

         this.hub.on("ReceiveNotification", (data) => {

            console.log("📩 Notificación recibida:", data);

            // Banner/sonido
            showNotificationBanner(data.title ?? "Notificación", data.message ?? "");

            // Sumar al contador
            notificationStore.increment();

            // Mostrar snackbar global (función global)
            ToastAndroid.show(data.title ?? "Nueva notificación", ToastAndroid.SHORT);

            // callbacks subscritos
            this.listeners.forEach(cb => cb(data));
        });

        // 🔄 Cuando SignalR reconecta
        this.hub.onreconnected(async () => {
            console.log("🟢 Reconectado al hub");
            await this.safeRegister();
        });

        // 🔴 Cuando pierde conexión completamente
        this.hub.onclose(async () => {
            console.log("🔴 Conexión cerrada. Reintentando…");
            this.tryReconnect();
        });

        try {
            await this.hub.start();
            console.log("🟢 WebSocket conectado a NotificationHub");

            await this.safeRegister();

        } catch (error) {
            console.error("🔴 Error al conectar:", error);
            this.tryReconnect();
        }
    }

    /// 🔐 Registrar usuario en el hub con reintentos
    private async safeRegister() {
        if (!this.hub || !this.userId) return;

        try {
            await this.hub.invoke("RegisterConnection", this.userId);
            console.log("🔗 Usuario registrado:", this.userId);
        } catch (err) {
            console.error("⚠ Error registrando conexión:", err);
            setTimeout(() => this.safeRegister(), 2000);
        }
    }

    /// 🔄 Reconexión manual cuando SignalR no lo hace
    private async tryReconnect() {
        if (this.reconnecting) return;
        this.reconnecting = true;

        console.log("♻ Intentando reconectar…");

        const interval = setInterval(async () => {
            const token = await tokenStorage.getAccessToken();
            if (!token) return;

            if (!this.hub || this.hub.state === SignalR.HubConnectionState.Disconnected) {
                try {
                    await this.hub?.start();
                    console.log("🟢 Reconectado manualmente");
                    await this.safeRegister();
                    clearInterval(interval);
                    this.reconnecting = false;
                } catch {
                    console.log("⏳ Reintentando conexión…");
                }
            }
        }, 4000);
    }

    subscribe(callback: (data: any) => void) {
        this.listeners.push(callback);
    }

    async disconnect() {
        if (this.hub) {
            await this.hub.stop();
            this.hub = null;
        }
    }
}

export const notificationHub = new NotificationHub();
