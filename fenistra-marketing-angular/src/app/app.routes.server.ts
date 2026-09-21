import { RenderMode, ServerRoute } from '@angular/ssr';

// Every route is prerendered to static HTML at build time (no Node server in production).
// Unknown URLs are served dist/.../404/index.html with status 404 via staticwebapp.config.json.
export const serverRoutes: ServerRoute[] = [{ path: '**', renderMode: RenderMode.Prerender }];
