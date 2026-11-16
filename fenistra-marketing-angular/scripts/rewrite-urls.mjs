// Engangsscript: skriver om interne lenker fra gammel til ny URL-struktur (se url-map.mjs).
// Treffer bare lenkeformer: "/slug", "slug.html", "slug#anker", href="slug" og fenistra.no/slug.
// Bildestier (images/partnere/…) og importstier (./pages/ki/…) blir ikke rørt.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { URL_MAP } from './url-map.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const olds = Object.keys(URL_MAP).sort((a, b) => b.length - a.length);
const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const rules = olds.flatMap(o => {
  const n = URL_MAP[o];
  return [
    // "/slug" etterfulgt av slutt på lenken
    [new RegExp(`(?<![\\w.-])/${esc(o)}(?=["'\`#?)\\s<;,]|\\.html|\\\\|$)`, 'gm'), `/${n}`],
    // "slug.html" eller "slug#anker" rett etter et anførselstegn
    [new RegExp(`(?<=["'\`])${esc(o)}(?=\\.html|#)`, 'g'), n],
    // href="slug"
    [new RegExp(`(?<=href=["'])${esc(o)}(?=["'])`, 'g'), n],
  ];
});
const docRules = olds.map(o => [new RegExp(`(?<=fenistra\\.no/)${esc(o)}(?=[;,"\\s#]|$)`, 'gm'), URL_MAP[o]]);

const files = [];
const walk = d => fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
  const p = path.join(d, e.name);
  if (e.isDirectory()) walk(p);
  else if (/\.(ts|html)$/.test(e.name) && e.name !== 'app.routes.ts') files.push(p);
});
walk(path.join(ROOT, 'src'));
files.push(path.join(ROOT, 'public/staticwebapp.config.json'), path.join(ROOT, 'public/llms.txt'));

let total = 0;
const apply = (f, rs) => {
  let src = fs.readFileSync(f, 'utf8'), n = 0;
  for (const [re, to] of rs) src = src.replace(re, () => { n++; return to; });
  if (n) { fs.writeFileSync(f, src); total += n; console.log(String(n).padStart(4), path.relative(ROOT, f)); }
};
files.forEach(f => apply(f, rules));
fs.readdirSync(path.join(ROOT, 'docs')).filter(f => f.endsWith('.csv')).forEach(f => apply(path.join(ROOT, 'docs', f), docRules));
console.log('totalt', total);
