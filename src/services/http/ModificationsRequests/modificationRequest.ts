/// <summary>
/// Servicio especializado para manejar las solicitudes de modificación de datos.
/// Hereda de ApiService para reutilizar los métodos CRUD genéricos.
/// </summary>

import { ApiService, ApiResponse } from "../../api";
import { httpWrapper } from "../../HttpServiceWrapper";
import { request } from "../request";

/// <summary>
/// Tipos genéricos:
/// - TCreate: DTO para creación de solicitud
/// - TListOrDetail: DTO para listado o detalle de solicitudes
/// </summary>
export class ModificationRequestService<
  TCreate,
  TListOrDetail
> extends ApiService<TCreate, TListOrDetail> {
  constructor() {
    // Llama al constructor base con la entidad "modificationrequest"
    super("ModificationRequest");
  }

  /// <summary>
  /// Obtiene las solicitudes del usuario autenticado (extrae el userId del token).
  /// Endpoint esperado: GET /api/modificationrequest/my-requests
  /// </summary>
  public getMyRequests() {
    return httpWrapper.handleRequest(
      request<ApiResponse<TListOrDetail[]>>(`${this.base}/my-requests`, {
        method: "GET",
      })
    );
  }
}
