// Comentario (ES): Tipos comunes del cliente HTTP.

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ReqOptions = {
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
  /** (ES) Si true, NO adjunta Authorization */
  skipAuth?: boolean;
};
