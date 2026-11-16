// Bygger public/sitemap.xml fra src/app/app.routes.ts.
// Format etter mystore.no/sitemap.xml: <loc>, ett <image:image> per bilde på siden, og <lastmod> (dato) til slutt.
// Kjør på nytt etter at sider er lagt til eller endret:  node scripts/generate-sitemap.mjs
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://www.fenistra.no';
const routesSrc = fs.readFileSync(path.join(ROOT, 'src/app/app.routes.ts'), 'utf8');

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
const decode = s => s.replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"');
const today = new Date().toISOString().slice(0, 10);

const gitDate = dir => {
  try {
    return execSync(`git log -1 --format=%cs -- "${dir}"`, { cwd: ROOT, encoding: 'utf8' }).trim() || today;
  } catch { return today; }
};

const pages = [];
for (const line of routesSrc.split('\n')) {
  const t = line.trim();
  if (t.startsWith('//')) continue;                       // utkommenterte (skjulte) sider
  const m = t.match(/path: '([^']*)', loadComponent: \(\) => import\('\.\/pages\/([^/]+)\//);
  if (!m) continue;                                        // redirects og annet
  if (/noindex: true/.test(t)) continue;                   // feilsider og skjulte sider
  const [, route, dir] = m;
  const modified = t.match(/modified: '(\d{4}-\d{2}-\d{2})'/)?.[1];
  const compDir = path.join('src/app/pages', dir);
  let lastmod = gitDate(compDir);
  if (modified && modified > lastmod) lastmod = modified;

  const html = fs.readFileSync(path.join(ROOT, compDir, `${dir}.component.html`), 'utf8');
  const images = [];
  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    const src = img[0].match(/\ssrc="([^"]+)"/)?.[1];
    if (!src || !/\.(jpe?g|png|webp|avif)$/i.test(src) || /^https?:/.test(src)) continue;
    const loc = `${BASE}/${src.replace(/^\/+/, '')}`;
    if (images.some(i => i.loc === loc)) continue;
    const alt = decode(img[0].match(/\salt="([^"]*)"/)?.[1] ?? '').trim();
    const caption = alt || path.basename(src).replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
    images.push({ loc: encodeURI(loc), caption });
  }
  pages.push({ loc: `${BASE}/${route}`, lastmod, images });
}

// Forsiden først, deretter i rekkefølgen fra routes-filen
pages.sort((a, b) => (a.loc === `${BASE}/` ? -1 : b.loc === `${BASE}/` ? 1 : 0));

const out = [`<?xml version='1.0' encoding='UTF-8'?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`];
for (const p of pages) {
  out.push('  <url>', `    <loc>${esc(p.loc)}</loc>`);
  for (const i of p.images) {
    out.push('    <image:image>', `      <image:loc>${esc(i.loc)}</image:loc>`,
      `      <image:caption>${esc(i.caption)}</image:caption>`, `      <image:title>${esc(i.caption)}</image:title>`, '    </image:image>');
  }
  out.push(`    <lastmod>${p.lastmod}</lastmod>`, '  </url>');
}
out.push('</urlset>', '');
fs.writeFileSync(path.join(ROOT, 'public/sitemap.xml'), out.join('\n'));
console.log(`${pages.length} sider, ${pages.reduce((n, p) => n + p.images.length, 0)} bilder → public/sitemap.xml`);
