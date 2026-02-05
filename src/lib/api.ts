const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options?.headers,
    },
    cache: options?.method === 'GET' || !options?.method ? 'no-store' : undefined,
  });

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const json = isJson ? await res.json() : null;

  if (!res.ok) {
    throw json || { message: 'An error occurred' };
  }

  return json;
}