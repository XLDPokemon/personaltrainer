const API_ROOT = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi';

export const API_BASE_URL = `${API_ROOT}/api`;
export const RESET_URL = `${API_ROOT}/reset`;

/** Sends a request and throws a readable error on any non-2xx response. */
export async function sendRequest(url: string, init?: RequestInit): Promise<Response> {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`The server responded with an error (${response.status}).`);
  }
  return response;
}

export async function getJson<T>(path: string): Promise<T> {
  const response = await sendRequest(`${API_BASE_URL}${path}`);
  return response.json();
}

export function sendJson(path: string, method: 'POST' | 'PUT', body: unknown): Promise<Response> {
  return sendRequest(`${API_BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

export function deleteResource(path: string): Promise<Response> {
  return sendRequest(`${API_BASE_URL}${path}`, { method: 'DELETE' });
}
