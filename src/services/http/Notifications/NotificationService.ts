

/// <summary>
/// Servicio especializado para manejar las notificaciones de usuario.
/// Hereda de ApiService para reutilizar los métodos CRUD genéricos.

import { ApiService, ApiResponse } from "../../api";
import { httpWrapper } from "../../HttpServiceWrapper";
import { request } from "../request";

/// </summary>
export class NotificationService<
  TCreate,
  TListOrDetail
> extends ApiService<TCreate, TListOrDetail> {
  constructor() {
    // Llama al constructor base con la entidad "notifications"
    super('Notifications');
  }

  /// <summary>
  /// Obtiene las notificaciones de un usuario específico por su ID.
  /// Endpoint esperado: GET /notifications/user/{userId}
  /// </summary>
  /// <param name="userId">ID del usuario cuyas notificaciones se desean consultar</param>
  /// <param name="token">Token de autenticación (opcional)</param>
  /// <returns>Lista de notificaciones del usuario</returns>
  public getNotificationsByUserId() {
    return httpWrapper.handleRequest(
      request<ApiResponse<TListOrDetail[]>>(`${this.base}/user`, {
        method: 'GET'
      })
    );
  }

  getCount() {
    return httpWrapper.handleRequest(
      request<number>(`${this.base}/count`, {
        method: 'GET'
      })
    );
  }

  /// <summary>
  /// Marca una notificación como leída.
  /// Endpoint: PUT /api/NotificationReceived/mark-as-read/{id}
  /// </summary>
  public markAsRead(id: number) {
    return httpWrapper.handleRequest(
      request<ApiResponse<any>>(`/NotificationReceived/mark-as-read/${id}`, {
        method: 'PUT'
      })
    );
  }

}
