const BASE_URL = 'https://demo5931952.mockable.io';

export const request = async <T>(
  input: string,
  init: RequestInit = {},
): Promise<T | undefined> => {
  const response = await fetch(`${BASE_URL}${input}`, {
    ...init,
  });

  if (!response.ok) {
    throw new Error('fetch error');
  }

  const contentType = response.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    return response.json() as Promise<T>;
  }
};
