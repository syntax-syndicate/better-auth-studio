import type { BetterAuthOptions } from 'better-auth';

export type ApiContext = {
  path: string;
  method: string;
  headers: Record<string, string>;
  body?: any;
  auth: any;
  basePath?: string;
};

export type ApiResponse = {
  status: number;
  data: any;
};

/**
 * Route API requests to the correct handler
 * This integrates with the existing routes.ts logic
 */
export async function routeApiRequest(ctx: ApiContext): Promise<ApiResponse> {
  const { handleStudioApiRequest } = await import('../routes.js');

  try {
    return await handleStudioApiRequest(ctx);
  } catch (error) {
    console.error('API routing error:', error);
    return {
      status: 500,
      data: { error: 'Internal server error' },
    };
  }
}
