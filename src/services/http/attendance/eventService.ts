/// <summary>
/// Servicio especializado para manejar los eventos.
/// Hereda de ApiService para los métodos CRUD base.
/// </summary>

import { ApiResponse, ApiService } from "../../api";
import { httpWrapper } from "../../HttpServiceWrapper";
import { request } from "../request";

/// ===============================
/// DTOs reales del backend
/// ===============================

export interface AccessPointDto {
  id: number;
  name: string;
  description?: string;
  eventId: number;
  eventName?: string | null;
  typeId: number;
  type?: string;
  isDeleted: boolean;
  qrCodeKey?: string;
  code?: string;
}

export interface ScheduleDto {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  days: any[];
  isDeleted: boolean;
  code?: string | null;
}

export interface AudienceDto {
  id: number;
  typeId: number;
  referenceId: number;
  referenceName?: string | null;
  isDeleted: boolean;
}

export interface EventFullDto {
  id: number;
  code: string;
  name: string;
  description?: string | null;
  eventStart: string;
  eventEnd: string;
  eventTypeId: number;
  eventTypeName?: string | null;
  statusId: number;
  statusName?: string | null;
  ispublic: boolean;
  scheduleId?: number | null;
  schedules: ScheduleDto[];
  audiences: AudienceDto[];
  accessPoints: AccessPointDto[];
  isDeleted: boolean;
}

export interface EventListFullResponse {
  items: EventFullDto[];
  total: number;
}

/// ===============================
/// Servicio real
/// ===============================

export class EventService<
  TCreate,
  TListOrDetail
> extends ApiService<TCreate, TListOrDetail> {
  constructor() {
    super("Event");
  }

  /// <summary>
  /// Obtiene la lista completa de eventos con todos los datos relacionados.
  /// Endpoint esperado: GET /api/Event/list-full
  /// </summary>
  public async listFull() {
    const url = `${this.base}/list-full`;

    return httpWrapper.handleRequest(
      request<ApiResponse<EventListFullResponse>>(url, {
        method: "GET"
      })
    );
  }
}
