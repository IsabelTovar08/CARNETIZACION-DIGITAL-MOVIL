import { request } from './request';
import { httpWrapper } from './HttpServiceWrapper';

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export class ApiService<TCreate, TListOrDetail> {
  private base: string;
  constructor(entidad: string) {
    this.base = `/${entidad}`;
  }

  /** GET /{entidad} */
  public getAll(token?: string | null) {
    return httpWrapper.handleRequest(
      request<ApiResponse<TListOrDetail[]>>(`${this.base}`, { method: 'GET', token })
    );
  }

  /** GET /{entidad}/{id} */
  public getById(id: number | string, token?: string | null) {
    return httpWrapper.handleRequest(
      request<ApiResponse<TListOrDetail>>(`${this.base}/${id}`, { method: 'GET', token })
    );
  }

  /** GET /{entidad}/active */
  public GetActive(token?: string | null) {
    return httpWrapper.handleRequest(
      request<ApiResponse<TListOrDetail>>(`${this.base}/active`, { method: 'GET', token })
    );
  }

  /** POST /{entidad} */
  public Save(objeto: TCreate, token?: string | null) {
    return httpWrapper.handleRequest(
      request<ApiResponse<TListOrDetail>>(`${this.base}`, { method: 'POST', body: objeto, token })
    );
  }

  /** PUT /{entidad}/update/  (respeta tu patrón exacto) */
  public update(data: TCreate, token?: string | null) {
    return httpWrapper.handleRequest(
      request<ApiResponse<TListOrDetail>>(`${this.base}/update/`, { method: 'PUT', body: data, token })
    );
  }

  /** DELETE /{entidad}/{id} */
  public delete(id: number | string, token?: string | null) {
    return httpWrapper.handleRequest(
      request<ApiResponse<any>>(`${this.base}/${id}`, { method: 'DELETE', token })
    );
  }

  /** PATCH /{entidad}/{id}/toggle-active */
  public deleteLogic(id: number | string, token?: string | null) {
    return httpWrapper.handleRequest(
      request<ApiResponse<any>>(`${this.base}/${id}/toggle-active`, { method: 'PATCH', token })
    );
  }
}
