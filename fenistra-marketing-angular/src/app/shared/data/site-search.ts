import { FENISTRA_SEARCH_INDEX, SearchEntry } from './search-index';

/**
 * Words that mean the same thing when searching. A query word matches an entry if the
 * entry contains the word itself or any word in its group.
 */
const SYNONYMS: string[][] = [
  ['ai', 'ki', 'kunstig intelligens', 'felix'],
  ['telefon', 'tlf', 'telefonnummer', 'ringe', 'ring', 'nummer'],
  ['e-post', 'epost', 'mail', 'email'],
  ['kontakt', 'kontakte', 'kontakt oss'],
  ['support', 'brukerstøtte', 'kundeservice', 'hjelp'],
  ['pris', 'priser', 'kostnad', 'koster', 'pakke', 'pakker'],
  ['ansatt', 'ansatte', 'medarbeider', 'medarbeidere', 'team'],
  ['felleskost', 'felleskostnad', 'felleskostnader'],
  ['mva', 'merverdiavgift'],
  ['rbo', 'revisorbekreftet omsetning'],
  ['integrasjon', 'integrasjoner', 'api'],
];

const MAX_RESULTS = 8;

// small words that carry no meaning on their own ("kan jeg snakke med noen")
const STOPWORDS = new Set(['jeg', 'du', 'vi', 'dere', 'kan', 'med', 'noen', 'en', 'et', 'ei', 'er', 'det', 'på', 'til', 'for',
  'og', 'om', 'av', 'å', 'hva', 'hvordan', 'hvor', 'hvem', 'har', 'ha', 'the', 'meg', 'oss', 'deg', 'få', 'vil', 'skal', 'finne']);

function normalize(text: string): string {
  return text.toLowerCase().replace(/[?!.,;:()«»"]/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Splits the query into terms; multi-word synonyms like "kunstig intelligens" stay one term. */
function queryTerms(query: string): string[] {
  let q = ` ${normalize(query)} `;
  const phrases: string[] = [];
  for (const group of SYNONYMS) {
    for (const word of group) {
      if (word.includes(' ') && q.includes(` ${word} `)) {
        phrases.push(word);
        q = q.replace(` ${word} `, ' ');
      }
    }
  }
  const words = q.split(' ').filter((w) => w.length > 1);
  const meaningful = words.filter((w) => !STOPWORDS.has(w));
  // "om oss" is only small words, so keep them rather than searching for nothing
  return [...phrases, ...(meaningful.length || phrases.length ? meaningful : words)];
}

function variants(term: string): string[] {
  const group = SYNONYMS.find((g) => g.includes(term));
  return group ? group : [term];
}

/** Whole-word (or word-start) match, so "ki" doesn't hit "kilde" but "fri" still finds "Frida". */
function hasWord(text: string, word: string): boolean {
  return new RegExp(`(^|[^a-zæøå0-9])${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(text);
}

/** Returns [score, number of terms that matched]. */
function scoreEntry(entry: SearchEntry, terms: string[]): [number, number] {
  const title = normalize(entry.title);
  const keywords = (entry.keywords ?? []).map(normalize);
  const rest = normalize(`${entry.category} ${entry.desc}`);
  let total = 0;
  let matched = 0;
  for (const term of terms) {
    let best = 0;
    for (const v of variants(term)) {
      if (title === v) best = Math.max(best, 10);
      else if (title.startsWith(v)) best = Math.max(best, 8);
      else if (hasWord(title, v)) best = Math.max(best, 6);
      if (keywords.some((k) => k === v || hasWord(k, v))) best = Math.max(best, 5);
      if (hasWord(rest, v)) best = Math.max(best, 2);
    }
    if (best > 0) matched++;
    total += best;
  }
  return [total, matched];
}

export function searchSite(query: string): SearchEntry[] {
  const terms = queryTerms(query);
  if (!terms.length) return [];
  const scored = FENISTRA_SEARCH_INDEX.map((entry, i) => {
    const [score, matched] = scoreEntry(entry, terms);
    return { entry, i, score, matched };
  });
  // prefer entries that match every word; otherwise fall back to the best partial matches
  const all = scored.filter((r) => r.matched === terms.length);
  const pool = all.length ? all : scored.filter((r) => r.matched > 0);
  return pool
    .sort((a, b) => b.matched - a.matched || b.score - a.score || a.i - b.i)
    .slice(0, MAX_RESULTS)
    .map((r) => r.entry);
}
