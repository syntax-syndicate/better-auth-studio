import { handleStudioRequest } from '../core/handler.js';
import type { StudioConfig, UniversalRequest, UniversalResponse } from '../types/handler.js';

type NextRequest = {
  method: string;
  headers: Headers;
  nextUrl: { pathname: string; search: string };
  json: () => Promise<any>;
};

/**
 * Next.js adapter for Better Auth Studio (App Router)
 */
export function createStudioHandler(config: StudioConfig) {
  return async (request: NextRequest): Promise<Response> => {
    try {
      const universalRequest = await nextToUniversal(request);

      const universalResponse = await handleStudioRequest(universalRequest, config);

      return universalToNext(universalResponse);
    } catch (error) {
      console.error('Studio handler error:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  };
}

async function nextToUniversal(req: NextRequest): Promise<UniversalRequest> {
  let body: any;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      try {
        body = await req.json();
      } catch {}
    }
  }

  const headers: Record<string, string> = {};
  req.headers.forEach((value: string, key: string) => {
    headers[key] = value;
  });

  return {
    url: req.nextUrl.pathname + req.nextUrl.search,
    method: req.method,
    headers,
    body,
  };
}

function universalToNext(res: UniversalResponse): Response {
  return new Response(res.body, {
    status: res.status,
    headers: res.headers,
  });
}
