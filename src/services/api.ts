const API_BASE = 'https://tu-backend.com/api'; // <- CAMBIA ESTO

type ReqOptions = {
  method?: 'GET'|'POST'|'PUT'|'PATCH'|'DELETE';
  body?: any;
  headers?: Record<string, string>;
  token?: string | null;
};

async function handle<T>(res: Response): Promise<T> {
  const text = await res.text();
  let data: any;
  try { data = text ? JSON.parse(text) : {}; } catch { data = { message: text }; }
  if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
  return data as T;
}

export async function request<T>(path: string, opts: ReqOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(opts.headers || {}),
  };
  if (opts.token) headers['Authorization'] = `Bearer ${opts.token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method: opts.method || 'GET',
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  return handle<T>(res);
}
