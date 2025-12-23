import type { StudioConfig, UniversalRequest, UniversalResponse } from '../types/handler.js';
/**
 * Main handler - processes all studio requests (framework-agnostic)
 *
 * Route mapping:
 * - CLI studio: basePath = ''
 *   - /api/users → API route /api/users
 *   - /users → SPA route (serves index.html)
 * - Self-hosted: basePath = '/api/studio'
 *   - /api/studio/users (JSON request) → API route /api/users
 *   - /api/studio/users (HTML request) → SPA route (serves index.html)
 */
export declare function handleStudioRequest(request: UniversalRequest, config: StudioConfig): Promise<UniversalResponse>;
//# sourceMappingURL=handler.d.ts.map