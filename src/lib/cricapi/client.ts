const BASE_URL = 'https://api.cricapi.com/v1';

interface FetchOptions {
  revalidate?: number;
  tags?: string[];
}

export async function cricApiFetch<T>(
  endpoint: string,
  params: Record<string, string> = {},
  options: FetchOptions = {}
): Promise<T> {
  const apiKey = process.env.CRICAPI_KEY;
  if (!apiKey) {
    throw new Error('CRICAPI_KEY environment variable is not set');
  }

  const searchParams = new URLSearchParams({
    apikey: apiKey,
    ...params,
  });

  const url = `${BASE_URL}/${endpoint}?${searchParams.toString()}`;

  const response = await fetch(url, {
    next: {
      revalidate: options.revalidate ?? 3600,
      tags: options.tags,
    },
  });

  if (!response.ok) {
    throw new Error(`CricAPI request failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  if (data.status !== 'success') {
    throw new Error(`CricAPI error: ${data.status} - ${JSON.stringify(data)}`);
  }

  return data.data as T;
}
