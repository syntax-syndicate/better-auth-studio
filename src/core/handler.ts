import { existsSync, readFileSync, statSync } from 'fs';
import { dirname, extname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import type {
  StudioConfig,
  StudioMetadata,
  UniversalRequest,
  UniversalResponse,
  WindowStudioConfig,
} from '../types/handler.js';
import { serveIndexHtml as getIndexHtml } from '../utils/html-injector.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Main handler - processes all studio requests (framework-agnostic)
 *
 * Route mapping:
 * - CLI studio: basePath = ''
 *   - /api/users → API route /api/users
 *   - /dashboard → SPA route
 * - Self-hosted: basePath = '/api/studio'
 *   - /api/studio/users → API route /api/users (adds /api prefix internally)
 *   - /api/studio/dashboard → SPA route
 */
export async function handleStudioRequest(
  request: UniversalRequest,
  config: StudioConfig
): Promise<UniversalResponse> {
  try {
    const basePath = config.basePath || '/api/studio';

    // 1. Check access control
    //   const hasAccess = await checkAccess(request, config);
    //   if (!hasAccess) {
    //     return jsonResponse(403, { error: 'Forbidden' });
    //   }

    let path = request.url.replace(basePath, '') || '/';
    if (path === '' || path === '/') {
      path = '/';
    }

    if (path.startsWith('/assets/') || path === '/vite.svg') {
      return handleStaticFile(path, config);
    }

    if (path === '/') {
      return handleStaticFile(path, config);
    }

    if (path.startsWith('/api/')) {
      return await handleApiRoute(request, path, config);
    }

    return handleStaticFile(path, config);
  } catch (error) {
    console.error('Studio handler error:', error);
    return jsonResponse(500, {
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

async function checkAccess(request: UniversalRequest, config: StudioConfig): Promise<boolean> {
  // TODO: Implement access control
  return true;
}

async function handleApiRoute(
  request: UniversalRequest,
  path: string,
  config: StudioConfig
): Promise<UniversalResponse> {
  const { routeApiRequest } = await import('../routes/api-router.js');

  try {
    const result = await routeApiRequest({
      path: path,
      method: request.method,
      headers: request.headers,
      body: request.body,
      auth: config.auth,
      basePath: config.basePath || '/api/studio',
    });

    return jsonResponse(result.status, result.data);
  } catch (error) {
    console.error('API route error:', error);
    return jsonResponse(500, { error: 'Internal server error' });
  }
}

function handleStaticFile(path: string, config: StudioConfig): UniversalResponse {
  let publicDir: string;

  const distPublic = resolve(__dirname, '../public');
  if (existsSync(distPublic)) {
    publicDir = distPublic;
  } else {
    // Fallback to source location
    const sourcePublic = resolve(__dirname, '../../public');
    if (existsSync(sourcePublic)) {
      publicDir = sourcePublic;
    } else {
      return jsonResponse(500, {
        error: 'Public directory not found',
        paths: {
          tried: [distPublic, sourcePublic],
          dirname: __dirname,
        },
      });
    }
  }

  return handleStaticFileFromDir(path, publicDir, config);
}

function handleStaticFileFromDir(
  path: string,
  publicDir: string,
  config: StudioConfig
): UniversalResponse {
  if (path === '/' || path === '') {
    return serveIndexHtml(publicDir, config);
  }

  const filePath = join(publicDir, path);

  if (existsSync(filePath) && statSync(filePath).isFile()) {
    const content = readFileSync(filePath);
    const contentType = getContentType(extname(filePath));

    return {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': getCacheControl(path),
      },
      body: content,
    };
  }

  return serveIndexHtml(publicDir, config);
}

function serveIndexHtml(publicDir: string, config: StudioConfig): UniversalResponse {
  const html = getIndexHtml(publicDir, {
    basePath: config.basePath || '/api/studio', // Default basePath for self-hosted
    metadata: config.metadata as any,
  });

  return {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache',
    },
    body: html,
  };
}

function jsonResponse(status: number, data: any): UniversalResponse {
  return {
    status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  };
}

function getContentType(ext: string): string {
  const types: Record<string, string> = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
  };
  return types[ext] || 'application/octet-stream';
}

function getCacheControl(path: string): string {
  // Cache static assets aggressively
  if (path.match(/\.(js|css|png|jpg|jpeg|svg|woff|woff2|ttf)$/)) {
    return 'public, max-age=31536000, immutable';
  }
  return 'no-cache';
}
