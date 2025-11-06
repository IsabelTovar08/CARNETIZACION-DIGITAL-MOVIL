/// <summary>
/// Servicio especializado para manejar la asistencia de personas.
/// Hereda de ApiService para reutilizar los métodos CRUD genéricos.
/// </summary>

import { ApiService, ApiResponse } from "../../api";
import { httpWrapper } from "../../HttpServiceWrapper";
import { request } from "../request";

/// <summary>
/// Tipos para definir los filtros de búsqueda y los resultados.
/// </summary>
export interface AttendanceSearchParams {
  personId?: number;
  eventId?: number;
  fromUtc?: string;
  toUtc?: string;
  sortBy?: string;
  sortDir?: "ASC" | "DESC";
  page?: number;
  pageSize?: number;
}

export interface AttendanceDto {
  id: number;
  personName: string;
  eventName: string;
  timeOfEntry: string;
  timeOfExit?: string;
  accessPointOfEntryName: string;
    accessPointOfExitName?: string;
}

export interface AttendanceSearchResponse {
    items: AttendanceDto[];
    total: number;
    page: number;
    pageSize: number;
};


/// <summary>
/// Clase principal del servicio de asistencia.
/// </summary>
export class AttendanceService<
  TCreate,
  TListOrDetail
> extends ApiService<TCreate, TListOrDetail> {
  constructor() {
    // Llama al constructor base con la entidad "Attendance"
    super("Attendance");
  }

  /// <summary>
  /// Realiza una búsqueda de asistencias con filtros opcionales.
  /// Endpoint esperado: GET /api/Attendance/search
  /// </summary>
  /// <param name="params">Filtros de búsqueda</param>
  public async searchAttendances(params?: AttendanceSearchParams) {
    const query = new URLSearchParams();

    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(key, value.toString());
      }
    });

    const url = `${this.base}/search?${query.toString()}`;

    return httpWrapper.handleRequest(
      request<AttendanceSearchResponse>(url, { method: "GET" })
    );
  }
}
