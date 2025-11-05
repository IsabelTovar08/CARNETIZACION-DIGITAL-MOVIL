/// <summary>
/// Servicio especializado para manejar la información del usuario autenticado.
/// Hereda de ApiService para reutilizar los métodos CRUD genéricos.
/// </summary>

import { ApiService, ApiResponse } from "../../api";
import { httpWrapper } from "../../HttpServiceWrapper";
import { request } from "../request";

/// <summary>
/// Clase que extiende de ApiService para acceder al endpoint /api/user.
/// </summary>
export class UserService<TUser> extends ApiService<TUser, TUser> {
  constructor() {
    // Llama al constructor base con la entidad "user"
    super("user");
  }

  /// <summary>
  /// Obtiene la información del usuario autenticado.
  /// Endpoint esperado: GET /api/user/me
  /// </summary>
  /// <returns>Objeto con la información completa del usuario (roles, permisos, perfil, etc.)</returns>
  public getCurrentUser() {
    return httpWrapper.handleRequest(
      request<ApiResponse<TUser>>(`${this.base}/me`, {
        method: "GET",
      })
    );
  }
}
