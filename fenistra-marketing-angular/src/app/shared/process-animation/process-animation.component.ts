import { Component, ElementRef, NgZone, OnDestroy, afterNextRender, inject, signal } from '@angular/core';

/**
 * «Hele leieforholdet i ett system.»: the lease process played as a looping animation.
 * Recreated from the Claude Design prototype «Prosessanimasjon» (1920×1080 stage, 31.9 s loop)
 * in the site's own colours and fonts. The stage is built and updated imperatively, once per
 * animation frame outside Angular, and only runs while it is on screen. Below 760px, and before
 * the browser has built the stage, a plain list of the same steps is shown instead.
 */

const INK = 'var(--plum-deep)', BODY = 'var(--ink-soft)', MUTED = '#94A3B8', LINE = 'var(--line)', CARD = '#FFFFFF', TINT = 'var(--paper-2)';
const MONO = 'var(--font-mono)';
/** playback speed: 1 = the prototype's tempo (31.9 s per loop) */
const SPEED = 1.5;
const W = 1920, H = 1080, X0 = 160, GAP = 440, LINE_Y = 590, CARD_W = 380, CARD_H = 224, CARD_Y = 326;

type Ease = (t: number) => number;
const easeOutCubic: Ease = (t) => (--t) * t * t + 1;
const easeInOutCubic: Ease = (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1);
const easeOutBack: Ease = (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
const tween = (start: number, dur: number, ease: Ease) => (t: number) => (t <= start ? 0 : t >= start + dur ? 1 : ease((t - start) / dur));
const M = {
  enter: (s: number, d = 0.6) => tween(s, d, easeOutCubic),
  draw: (s: number, d = 0.8) => tween(s, d, easeInOutCubic),
  pop: (s: number, d = 0.45) => tween(s, d, easeOutBack),
};
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const nb = (n: number) => Math.round(n).toLocaleString('nb-NO').replace(/ | /g, ' ');
const typed = (s: string, p: number) => s.slice(0, Math.round(s.length * Math.max(0, Math.min(1, p))));

const SCENES: [string, number][] = [
  ['Intro', 2.5], ['Kontakt', 2.8], ['Match', 2.8], ['Pris', 2.8], ['Signering', 2.8], ['Protokoll', 2.8],
  ['Faktura', 2.8], ['Felleskost', 2.8], ['Regulering', 2.8], ['Videre', 2.8], ['Oversikt', 4.2],
];
const CUES: Record<string, number> = {};
let TOTAL = 0;
for (const [name, dur] of SCENES) { CUES[name] = Math.round(TOTAL * 1000) / 1000; TOTAL += dur; }

export const PROCESS_STEPS = [
  { key: 'Kontakt', title: 'Første kontakt', desc: 'Leietakeren og behovet registreres én gang.', chip: 'Nordlys AS · 800 m²' },
  { key: 'Match', title: 'Match mot ledige lokaler', desc: 'Fenistra finner lokalene som passer behovet.', chip: 'Bryggegata 4' },
  { key: 'Pris', title: 'Pris for leietakertilpasning', desc: 'Beregn hva tilpasningen koster, og hva den betyr for leien.', chip: '+142 kr/m²' },
  { key: 'Signering', title: 'Forhandling og signering', desc: 'Leieavtalen fylles ut fra saken, forhandles og signeres digitalt.', chip: 'Signert' },
  { key: 'Protokoll', title: 'Innflyttingsprotokoll', desc: 'Protokollen tas på mobilen ved overtakelse.', chip: 'Protokoll ✓' },
  { key: 'Faktura', title: 'Fakturering', desc: 'Leieforholdet faktureres etter kontrakten fra første dag.', chip: 'Faktura #1001' },
  { key: 'Felleskost', title: 'Avregning av felleskostnader', desc: 'Kostnadene fordeles og avregnes etter fordelingsnøkkelen.', chip: 'Andel 8,4 %' },
  { key: 'Regulering', title: 'Regulering', desc: 'KPI-regulering og reguleringsbrev, år etter år.', chip: 'KPI +3,1 %' },
  { key: 'Videre', title: 'Og videre', desc: 'Ny avregning, reforhandling og nye leietakere. Det som er registrert, følger med.', chip: null },
];
const N = PROCESS_STEPS.length;
const nodeX = (i: number) => X0 + i * GAP;

/* ---------- tiny DOM helpers ---------- */
type Css = Partial<Record<string, string | number>>;
function el(tag: string, style: Css = {}, ...kids: (Node | string | null | undefined)[]): HTMLElement {
  const e = document.createElement(tag);
  css(e, style);
  for (const k of kids) if (k != null) e.append(k);
  return e;
}
function css(e: HTMLElement, style: Css) {
  for (const [k, v] of Object.entries(style)) {
    if (v == null) continue;
    const val = typeof v === 'number' && !/opacity|fontWeight|flex|zIndex|lineHeight/.test(k) ? `${v}px` : String(v);
    if (k.startsWith('--')) e.style.setProperty(k, val);
    else (e.style as unknown as Record<string, string>)[k] = val;
  }
}

/* ---------- small UI atoms (mirroring the prototype) ---------- */
function label(text: string, right?: HTMLElement) {
  return el('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: MONO, fontSize: 15, letterSpacing: '0.06em', textTransform: 'uppercase', color: MUTED, marginBottom: 14 }, el('span', {}, text), right);
}
function row(k: string, v: string | HTMLElement, opts: { strong?: boolean } = {}) {
  const value = el('span', { color: INK, fontWeight: opts.strong ? 600 : 500, fontVariantNumeric: 'tabular-nums' }, v);
  const r = el('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '7px 0', borderBottom: `1px solid ${LINE}`, fontSize: 19 }, el('span', { color: MUTED }, k), value);
  return { r, value };
}
function pill(text: string, on = true) {
  return el('span', { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 999, fontFamily: MONO, fontSize: 14, letterSpacing: '0.04em', textTransform: 'uppercase', background: on ? INK : TINT, color: on ? '#fff' : BODY, transformOrigin: 'right center' }, text);
}
const setPill = (e: HTMLElement, p: number) => css(e, { transform: `scale(${0.6 + 0.4 * p})`, opacity: Math.min(1, p * 1.5) });
function total(labelText: string) {
  const value = el('span', { color: INK, fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' });
  return { r: el('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 14 }, el('span', { color: BODY, fontSize: 19 }, labelText), value), value };
}

/* ---------- vignettes: build once, update with seconds since the step's cue ---------- */
type Vignette = { root: HTMLElement; update: (lt: number) => void };
const VIGNETTES: Record<string, () => Vignette> = {
  Kontakt: () => {
    const p0 = pill('Registrert');
    const data = [['Leietaker', 'Nordlys AS'], ['Behov', 'Kontor · 800 m²'], ['Område', 'Oslo sentrum']];
    const rows = data.map(([k, v]) => {
      const txt = el('span'), caret = el('span', { color: MUTED }, '|');
      return { ...row(k, el('span', {}, txt, caret)), txt, caret, v };
    });
    return {
      root: el('div', {}, label('Ny henvendelse', p0), ...rows.map((x) => x.r)),
      update: (lt) => {
        setPill(p0, M.pop(1.9)(lt));
        rows.forEach((x, i) => {
          const p = M.draw(0.35 + i * 0.45, 0.5)(lt);
          x.txt.textContent = typed(x.v, p);
          x.caret.style.opacity = p > 0 && p < 1 ? '1' : '0';
        });
      },
    };
  },
  Match: () => {
    const data: [string, number][] = [['Bryggegata 4', 96], ['Tollbugata 12', 81], ['Akersgata 7', 74]];
    const rows = data.map(([k, v], i) => {
      const name = el('span', { color: INK, fontWeight: 500 }, k);
      const fill = el('span', { display: 'block', height: '100%', width: '0%', background: i === 0 ? INK : '#CBD5E1' });
      const pct = el('span', { fontFamily: MONO, fontSize: 16, color: BODY, textAlign: 'right' }, '0%');
      const r = el('div', { display: 'grid', gridTemplateColumns: '150px 1fr 48px', alignItems: 'center', gap: 12, padding: '8px 8px', margin: '0 -8px', borderRadius: 4, fontSize: 18 },
        name, el('span', { height: 6, background: LINE, borderRadius: 3, overflow: 'hidden' }, fill), pct);
      return { r, name, fill, pct, v };
    });
    return {
      root: el('div', {}, label('3 treff · 800 m²'), ...rows.map((x) => x.r)),
      update: (lt) => {
        const hi = M.enter(1.5, 0.4)(lt);
        rows.forEach((x, i) => {
          const p = M.draw(0.3 + i * 0.18, 0.9)(lt);
          x.fill.style.width = `${x.v * p}%`;
          x.pct.textContent = `${Math.round(x.v * p)}%`;
          if (i === 0) {
            x.r.style.background = `rgba(30,41,59,${0.06 * hi})`;
            x.name.style.fontWeight = hi > 0.5 ? '600' : '500';
          }
        });
      },
    };
  },
  Pris: () => {
    const a = row('Ombygging', ''), b = row('Nedbetaling', '5 år · 4,5 %'), t = total('Tillegg i leien');
    return {
      root: el('div', {}, label('Leietakertilpasning'), a.r, b.r, t.r),
      update: (lt) => {
        a.value.textContent = `${nb(1240000 * M.draw(0.3, 0.6)(lt))} kr`;
        b.r.style.opacity = String(M.enter(0.6)(lt));
        t.value.textContent = `+${Math.round(142 * M.draw(0.9, 1.0)(lt))} kr/m²`;
      },
    };
  },
  Signering: () => {
    const p0 = pill('Signert');
    const bars = [0.92, 0.78, 0.86].map((w) => {
      const fill = el('div', { height: '100%', width: '0%', background: '#CBD5E1' });
      return { wrap: el('div', { height: 8, borderRadius: 4, background: TINT, marginBottom: 10, overflow: 'hidden' }, fill), fill, w };
    });
    const sig = el('div', { position: 'absolute', left: 4, bottom: 4, fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: 'italic', fontSize: 34, color: INK, whiteSpace: 'nowrap' }, 'K. Nordli');
    return {
      root: el('div', {}, label('Leieavtale · utkast 2', p0), ...bars.map((b) => b.wrap),
        el('div', { marginTop: 14, borderBottom: `1.5px solid ${INK}`, height: 52, position: 'relative', overflow: 'hidden' }, sig),
        el('div', { fontFamily: MONO, fontSize: 13, color: MUTED, marginTop: 6 }, 'Nordlys AS · BankID')),
      update: (lt) => {
        setPill(p0, M.pop(1.85)(lt));
        bars.forEach((b, i) => (b.fill.style.width = `${b.w * 100 * M.draw(0.2 + i * 0.15, 0.5)(lt)}%`));
        sig.style.clipPath = `inset(0 ${100 - M.draw(1.0, 0.8)(lt) * 100}% 0 0)`;
      },
    };
  },
  Protokoll: () => {
    const shutter = el('div', { width: 26, height: 26, borderRadius: 13, border: `2px solid ${INK}`, background: '#fff' });
    const phone = el('div', { width: 108, height: 182, border: `2px solid ${INK}`, borderRadius: 16, padding: 6, flex: 'none', boxSizing: 'border-box' },
      el('div', { width: '100%', height: '100%', borderRadius: 10, background: 'repeating-linear-gradient(135deg, var(--paper-2) 0 6px, #FFFFFF 6px 12px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 8, boxSizing: 'border-box' }, shutter));
    const items = [['Nøkler', '3 stk'], ['Strøm', '48 213 kWh'], ['Bilder', '14']].map(([k, v]) => {
      const tick = el('span', { width: 22, height: 22, borderRadius: 11, background: INK, color: '#fff', fontSize: 13, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none', transform: 'scale(0)' }, '✓');
      return { r: el('div', { display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: `1px solid ${LINE}`, fontSize: 18 }, tick, el('span', { color: MUTED, flex: 1 }, k), el('span', { color: INK, fontWeight: 500 }, v)), tick };
    });
    return {
      root: el('div', { display: 'flex', gap: 20, height: '100%' }, phone, el('div', { flex: 1 }, label('Overtakelse'), ...items.map((x) => x.r))),
      update: (lt) => {
        shutter.style.transform = `scale(${1 - 0.15 * M.pop(1.2, 0.3)(lt) + 0.15 * M.enter(1.5, 0.3)(lt)})`;
        items.forEach((x, i) => (x.tick.style.transform = `scale(${M.pop(0.5 + i * 0.45)(lt)})`));
      },
    };
  },
  Faktura: () => {
    const draft = pill('Utkast', false), sent = pill('Sendt');
    const right = el('span', { display: 'inline-flex' }, draft, sent);
    const b = row('Grunnlag', 'Kontrakt § 4'), t = total('Å betale');
    return {
      root: el('div', {}, label('Faktura #1001', right), row('Periode', '1. kvartal 2027').r, b.r, t.r),
      update: (lt) => {
        const p = M.pop(1.7)(lt);
        draft.style.display = p > 0.01 ? 'none' : '';
        sent.style.display = p > 0.01 ? '' : 'none';
        setPill(sent, p);
        b.r.style.opacity = String(M.enter(0.4)(lt));
        t.value.textContent = `${nb(412500 * M.draw(0.5, 1.0)(lt))} kr`;
      },
    };
  },
  Felleskost: () => {
    const segs = [8.4, 22, 31, 18, 20.6];
    const colors = [INK, '#CBD5E1', '#E2E8F0', '#CBD5E1', '#E2E8F0'];
    const bars = segs.map((s, i) => ({ e: el('div', { width: '0%', background: colors[i], borderRadius: 2 }), s }));
    const lbl = el('div', { display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 18 },
      el('span', { color: INK, fontWeight: 600 }, 'Nordlys AS · 8,4 %'), el('span', { color: BODY, fontVariantNumeric: 'tabular-nums' }, '408 240 kr'));
    return {
      root: el('div', {}, label('Fordelingsnøkkel · 2027'), row('Felleskostnader', '4 860 000 kr').r,
        el('div', { display: 'flex', gap: 3, height: 26, marginTop: 18 }, ...bars.map((b) => b.e)), lbl),
      update: (lt) => {
        bars.forEach((b, i) => (b.e.style.width = `${b.s * M.draw(0.4 + i * 0.12, 0.6)(lt)}%`));
        const p = M.enter(1.6)(lt);
        css(lbl, { opacity: p, transform: `translateY(${(1 - p) * 8}px)` });
      },
    };
  },
  Regulering: () => {
    const p0 = pill('Brev sendt');
    const b = row('KPI-endring', '+3,1 %'), t = total('Ny leie');
    return {
      root: el('div', {}, label('KPI-regulering', p0), row('Leie i dag', '1 650 kr/m²').r, b.r, t.r),
      update: (lt) => {
        setPill(p0, M.pop(1.8)(lt));
        b.r.style.opacity = String(M.enter(0.4)(lt));
        t.value.textContent = `${nb(1650 + 51 * M.draw(0.7, 0.9)(lt))} kr/m²`;
      },
    };
  },
  Videre: () => {
    const rows = [['Ny avregning', '2028'], ['Reforhandling', 'Bryggegata 4'], ['Ny leietaker', 'Tollbugata 12']].map(([k, v]) =>
      el('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 12px', marginBottom: 8, border: '1px dashed #CBD5E1', borderRadius: 4, fontSize: 18 },
        el('span', { color: INK, fontWeight: 500 }, k), el('span', { fontFamily: MONO, fontSize: 15, color: MUTED }, v)));
    return {
      root: el('div', {}, label('Neste i saken'), ...rows),
      update: (lt) => rows.forEach((r, i) => {
        const p = M.enter(0.3 + i * 0.4)(lt);
        css(r, { opacity: p, transform: `translateX(${(1 - p) * 24}px)` });
      }),
    };
  },
};

@Component({
  selector: 'app-process-animation',
  standalone: true,
  templateUrl: './process-animation.component.html',
  styleUrl: './process-animation.component.scss',
})
export class ProcessAnimationComponent implements OnDestroy {
  steps = PROCESS_STEPS;
  /** pause/play button: true while the visitor has paused the loop */
  paused = signal(false);
  private frame?: number;
  private sync?: () => void;
  private rewind?: () => void;
  private cleanup: (() => void)[] = [];

  constructor() {
    const host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    const zone = inject(NgZone);
    afterNextRender(() => zone.runOutsideAngular(() => this.build(host)));
  }

  private build(host: HTMLElement) {
    const stage = host.querySelector<HTMLElement>('.pa-stage');
    if (!stage) return;
    const render = this.createScene(stage);
    host.classList.add('pa-ready');

    // Fit the 1920×1080 canvas to the stage's width
    const canvas = stage.firstElementChild as HTMLElement;
    const fit = () => (canvas.style.transform = `scale(${stage.clientWidth / W})`);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(stage);
    this.cleanup.push(() => ro.disconnect());

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      render(CUES['Oversikt'] + 2.6); // the zoomed-out overview, held still
      return;
    }

    // Play only while visible and not paused; the loop resumes where it stopped
    host.classList.add('pa-motion');
    let elapsed = 0, last = 0, running = false, visible = false;
    const loop = (now: number) => {
      elapsed += Math.min(0.1, (now - last) / 1000) * SPEED;
      last = now;
      render(elapsed % TOTAL);
      this.frame = requestAnimationFrame(loop);
    };
    this.sync = () => {
      const play = visible && !this.paused();
      if (play && !running) { running = true; last = performance.now(); this.frame = requestAnimationFrame(loop); }
      else if (!play && running) { running = false; if (this.frame) cancelAnimationFrame(this.frame); }
    };
    this.rewind = () => { elapsed = 0; render(0); };
    render(0);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; this.sync?.(); }, { threshold: 0.25 });
    io.observe(stage);
    this.cleanup.push(() => io.disconnect());
  }

  /** Back to the first step, and playing again if it was paused */
  restart() {
    this.rewind?.();
    this.paused.set(false);
    this.sync?.();
  }

  togglePause() {
    this.paused.update((p) => !p);
    this.sync?.();
  }

  /** Builds the stage DOM once and returns a function that poses it at time T (seconds). */
  private createScene(stage: HTMLElement): (T: number) => void {
    const MAXX = nodeX(N - 1) + CARD_W + 160 - W;
    const worldW = nodeX(N - 1) + CARD_W + 160;
    const solidEnd = nodeX(N - 2), dashEnd = nodeX(N - 1) + 300;
    const cue = (i: number) => CUES[PROCESS_STEPS[i].key];
    const camTarget = (i: number) => Math.max(0, Math.min(MAXX, (i - 1) * GAP));

    const canvas = el('div', { position: 'absolute', left: 0, top: 0, width: W, height: H, transformOrigin: '0 0' });
    const layer = el('div', { position: 'absolute', inset: 0 });
    const head = el('div', { fontSize: 72, fontWeight: 300, letterSpacing: '-0.025em', lineHeight: 1.05, color: INK }, 'Hele leieforholdet i ett system.');
    const sub = el('div', { fontSize: 28, color: BODY, marginTop: 22, lineHeight: 1.4 }, 'Fra lead og visning til kontrakt, fakturering, regulering og avregning.');
    const header = el('div', { position: 'absolute', left: X0, top: 84, width: 1500 }, head, sub);
    const world = el('div', { position: 'absolute', left: 0, top: 0, width: worldW, height: H, transformOrigin: '0 0' });
    const track = el('div', { position: 'absolute', left: X0, top: LINE_Y - 1, height: 3, width: 0, background: LINE });
    const dash = el('div', { position: 'absolute', left: solidEnd, top: LINE_Y - 1, height: 3, width: 0, backgroundImage: 'repeating-linear-gradient(90deg, var(--line) 0 14px, transparent 14px 26px)', WebkitMaskImage: 'linear-gradient(90deg, #000 60%, transparent)', maskImage: 'linear-gradient(90deg, #000 60%, transparent)' });
    const progress = el('div', { position: 'absolute', left: X0, top: LINE_Y - 1, height: 3, width: 0, background: INK });
    world.append(track, dash, progress);

    const nodes = PROCESS_STEPS.map((st, i) => {
      const v = VIGNETTES[st.key]();
      const card = el('div', { position: 'absolute', left: nodeX(i), top: CARD_Y, width: CARD_W, height: CARD_H, boxSizing: 'border-box', padding: '18px 22px', background: CARD, border: `1px solid ${LINE}`, borderRadius: 6 }, v.root);
      const stem = el('div', { position: 'absolute', left: nodeX(i) + 17, top: CARD_Y + CARD_H, width: 1.5, height: 0, background: LINE });
      const halo = el('div', { position: 'absolute', inset: 0, borderRadius: 17, background: INK, opacity: 0 });
      const ring = el('div', { position: 'absolute', inset: 0, borderRadius: 17, boxSizing: 'border-box', background: '#fff', border: `2.5px solid ${LINE}` });
      const fill = i < N - 1 ? el('div', { position: 'absolute', inset: 0, borderRadius: 17, background: INK, transform: 'scale(0)' }) : null;
      const node = el('div', { position: 'absolute', left: nodeX(i), top: LINE_Y - 17, width: 34, height: 34 }, halo, ring, fill);
      const title = el('div', { fontSize: 32, fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.2, textWrap: 'balance' }, st.title);
      const desc = el('div', { fontSize: 24, lineHeight: 1.45, marginTop: 12, textWrap: 'pretty' }, st.desc);
      const text = el('div', { position: 'absolute', left: nodeX(i), top: LINE_Y + 54, width: CARD_W - 20 }, title, desc);
      world.append(card, stem, node, text);
      return { v, card, stem, halo, ring, fill, title, desc, text };
    });

    const chips = PROCESS_STEPS.filter((s) => s.chip).map((st) => {
      const inner = el('span', {});
      const chip = el('span', { display: 'inline-flex', alignItems: 'center', boxSizing: 'border-box', height: 40, padding: '0 14px', fontFamily: MONO, fontSize: 17, lineHeight: 1, whiteSpace: 'nowrap', borderRadius: 4, color: '#fff', transformOrigin: 'left center' }, inner);
      return { st, chip, inner };
    });
    const ledger = el('div', { position: 'absolute', left: X0, right: X0, top: 948, display: 'flex', alignItems: 'center', gap: 12 },
      el('span', { fontFamily: MONO, fontSize: 17, color: BODY, letterSpacing: '0.02em', whiteSpace: 'nowrap', marginRight: 10 }, 'Sak 2026-0412 →'), ...chips.map((c) => c.chip));
    const outro = el('div', { position: 'absolute', left: X0, top: 860, fontSize: 40, fontWeight: 500, letterSpacing: '-0.02em', color: INK }, 'Én plattform. Hele leieforholdet.');

    layer.append(header, world, ledger, outro);
    canvas.append(layer);
    stage.append(canvas);

    return (T: number) => {
      // camera follows the active step, then zooms out to the whole process
      let camX = 0;
      for (let i = 1; i < N; i++) camX += (camTarget(i) - camTarget(i - 1)) * M.draw(cue(i) - 0.35, 0.9)(T);
      const zoom = M.draw(CUES['Oversikt'] + 0.2, 1.4)(T);
      const s = lerp(1, W / worldW, zoom);
      const wx = lerp(-camX, 0, zoom), wy = lerp(0, 560 - 600 * (W / worldW) + 40, zoom);
      world.style.transform = `translate(${wx}px, ${wy}px) scale(${s})`;

      layer.style.opacity = String(M.enter(0, 0.8)(T) * (1 - M.enter(TOTAL - 0.7, 0.6)(T)));
      const h = M.enter(0.1, 0.8)(T), sb = M.enter(0.4, 0.8)(T);
      css(head, { opacity: h, transform: `translateY(${(1 - h) * 20}px)` });
      css(sub, { opacity: sb, transform: `translateY(${(1 - sb) * 14}px)` });

      let prog = 0;
      for (let i = 1; i < N; i++) prog += M.draw(cue(i) - 0.6, 0.6)(T);
      const trackP = M.draw(0.6, 1.4)(T);
      track.style.width = `${(solidEnd - X0) * trackP}px`;
      dash.style.width = `${(dashEnd - solidEnd) * Math.max(0, trackP * 2 - 1)}px`;
      progress.style.width = `${Math.min(prog, N - 2) * GAP}px`;

      nodes.forEach((n, i) => {
        const c = cue(i), next = i < N - 1 ? cue(i + 1) : CUES['Oversikt'];
        const reach = M.pop(c - 0.05, 0.4)(T);
        const halo = M.enter(c, 1.1)(T);
        const cardIn = M.enter(c + 0.05, 0.6)(T);
        const dim = M.enter(next - 0.2, 0.6)(T) * (1 - zoom);
        css(n.card, {
          opacity: cardIn * (1 - 0.6 * dim),
          transform: `translateY(${(1 - cardIn) * 28 + dim * 6}px)`,
          boxShadow: `0 ${18 * (1 - dim)}px ${40 * (1 - dim)}px -18px rgba(30,41,59,${0.28 * (1 - dim)})`,
        });
        if (cardIn > 0) n.v.update(T - c);
        n.stem.style.height = `${(LINE_Y - 17 - CARD_Y - CARD_H) * cardIn}px`;
        css(n.halo, { opacity: halo > 0 && halo < 1 ? 0.22 * (1 - halo) : 0, transform: `scale(${1 + 1.4 * halo})` });
        css(n.ring, { borderColor: reach > 0.01 ? 'var(--plum-deep)' : 'var(--line)', opacity: Math.max(0, Math.min(1, trackP * 1.6 - i * 0.08)) });
        if (n.fill) n.fill.style.transform = `scale(${reach})`;
        const on = M.enter(c - 0.1, 0.5)(T) > 0.5;
        const tin = M.enter(1.0 + i * 0.08, 0.6)(T);
        css(n.text, { opacity: tin, transform: `translateY(${(1 - tin) * 12}px)` });
        n.title.style.color = on ? 'var(--plum-deep)' : MUTED;
        n.desc.style.color = on ? 'var(--ink-soft)' : '#CBD5E1';
      });

      const li = M.enter(cue(0) + 1.4, 0.6)(T);
      css(ledger, { opacity: li, transform: `translateY(${(1 - li) * 16}px)` });
      chips.forEach(({ st, chip, inner }) => {
        const p = M.pop(CUES[st.key] + 1.9, 0.45)(T);
        const shown = p > 0.01;
        css(chip, { background: shown ? INK : 'transparent', border: `1px dashed ${shown ? 'var(--plum-deep)' : 'var(--line)'}`, transform: `scale(${0.7 + 0.3 * p})`, minWidth: shown ? 0 : 60 });
        inner.textContent = shown ? st.chip : '';
        inner.style.opacity = String(Math.min(1, p));
      });

      const o = M.enter(CUES['Oversikt'] + 1.2, 0.8)(T);
      css(outro, { opacity: o, transform: `translateY(${(1 - o) * 14}px)` });
    };
  }

  ngOnDestroy() {
    if (this.frame) cancelAnimationFrame(this.frame);
    this.cleanup.forEach((f) => f());
  }
}
