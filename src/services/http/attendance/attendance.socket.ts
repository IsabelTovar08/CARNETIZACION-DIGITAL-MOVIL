import * as SignalR from "@microsoft/signalr";
import { BehaviorSubject } from "rxjs";
import { tokenStorage } from "../../auth/tokenStorage";
import { ENV } from "../../../config/env";

class AttendanceSocket {
  private connection: SignalR.HubConnection | null = null;

  /// <summary>
  /// Lista interna que emite cualquier entrada o salida nueva.
  /// </summary>
  public events$ = new BehaviorSubject<any | null>(null);

  /// <summary>
  /// Conectar al hub de asistencias.
  /// </summary>
  async connect() {
    const token = await tokenStorage.getAccessToken();
    if (!token) return;

    if (this.connection && this.connection.state === SignalR.HubConnectionState.Connected) {
      return;
    }

    this.connection = new SignalR.HubConnectionBuilder()
      .withUrl(`${ENV.URL_BASE}/hubs/attendance`, {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    // Asignar listeners
    this.connection.on("AttendanceEntry", (data) => {
      console.log("📥 Nueva entrada:", data);
      this.events$.next({ type: "entry", data });
    });

    this.connection.on("AttendanceExit", (data) => {
      console.log("📤 Nueva salida:", data);
      this.events$.next({ type: "exit", data });
    });

    try {
      await this.connection.start();
      console.log("🔵 AttendanceHub conectado");
    } catch (error) {
      console.log("❌ Error conectando al AttendanceHub:", error);
    }
  }

  /// <summary>
  /// Desconectar el hub.
  /// </summary>
  async disconnect() {
    if (this.connection) {
      await this.connection.stop();
    }
  }
}

export const attendanceSocket = new AttendanceSocket();
