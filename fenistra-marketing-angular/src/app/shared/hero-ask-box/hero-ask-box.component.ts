import { Component, NgZone, OnDestroy, afterNextRender, computed, inject, signal } from '@angular/core';

/**
 * «Bare spør»-boksen ved siden av forsidetittelen: et spørsmål skrives inn, svaret kommer linje for linje,
 * og fanene Svarer / Sier ifra / Gjør jobben veksler i løkke. Gjenskapt fra Claude Design-prototypen
 * «Bare spør Boks» (samme tekster og timing) i sidens farger. Eksempeldata, rent visuelt (aria-hidden).
 */
const QA = [
  { tab: 0, kind: '›', q: 'Hvilke kontrakter utløper i 2027, og hvilke ligger under markedsleie?',
    a: ['14 kontrakter utløper i 2027.', '5 ligger under markedsleie, i snitt −11 %.', 'Grunnlag: Arealstatistikk, 3. kvartal 2026'] },
  { tab: 1, kind: '!', q: 'Leietaker i Storgata 12 har meldt behov for mer plass.',
    a: ['Dere har ledig lokale 3.02 · 412 m² i samme bygg.', 'Forslag: send tilbud før opsjonsfristen 1. desember.', 'Grunnlag: kontrakt 2019-044, arealbehov registrert 14.10'] },
  { tab: 2, kind: '✓', q: 'KPI-regulering for 38 kontrakter per 1. januar.',
    a: ['Ny leie beregnet for 38 av 38 kontrakter.', 'Fakturagrunnlag klart. Venter på din godkjenning.', 'Grunnlag: KPI oktober 2026, SSB'] },
];
const SHOW_MS = 2400;
const CHAR_MS = 26, LINE_MS = 750, PAUSE_MS = 700, HOLD_MS = 3600, TICK_MS = 30;

@Component({
  selector: 'app-hero-ask-box',
  standalone: true,
  templateUrl: './hero-ask-box.component.html',
  styleUrl: './hero-ask-box.component.scss',
})
export class HeroAskBoxComponent implements OnDestroy {
  tabs = ['Svarer', 'Sier ifra', 'Gjør jobben'];
  shown = signal(false);
  /** index of the current question, characters typed, answer lines shown, loop started */
  qa = signal({ i: 0, n: 0, lines: 0, on: false });

  current = computed(() => QA[this.qa().i]);
  typed = computed(() => (this.qa().on ? this.current().q.slice(0, this.qa().n) : ''));
  typing = computed(() => !this.qa().on || this.qa().n < this.current().q.length);
  answer = computed(() => (this.qa().on ? this.current().a.slice(0, this.qa().lines) : []));

  private timers: ReturnType<typeof setTimeout>[] = [];
  private interval?: ReturnType<typeof setInterval>;

  constructor() {
    const zone = inject(NgZone);
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // no typing: show the first question and its full answer, still
        this.shown.set(true);
        this.qa.set({ i: 0, n: QA[0].q.length, lines: QA[0].a.length, on: true });
        return;
      }
      // runs outside Angular; the signals schedule the re-render on their own
      zone.runOutsideAngular(() => {
        // wait until «Fenistra kan eiendom.» has come in (the hero text animates over ~2 s), then fade in
        this.timers.push(setTimeout(() => this.shown.set(true), SHOW_MS));
        this.timers.push(setTimeout(() => this.loop(), SHOW_MS + 700));
      });
    });
  }

  private loop() {
    // measured against the real clock, so throttled timers (background tabs) don't slow the typing down
    let i = 0, t0 = performance.now();
    this.interval = setInterval(() => {
      let clock = performance.now() - t0;
      const it = QA[i];
      if (clock > it.q.length * CHAR_MS + PAUSE_MS + it.a.length * LINE_MS + HOLD_MS) { i = (i + 1) % QA.length; t0 = performance.now(); clock = 0; }
      const cur = QA[i], typeDur = cur.q.length * CHAR_MS;
      const n = Math.min(cur.q.length, Math.floor(clock / CHAR_MS));
      const lines = clock < typeDur + PAUSE_MS ? 0 : Math.min(cur.a.length, 1 + Math.floor((clock - typeDur - PAUSE_MS) / LINE_MS));
      const q = this.qa();
      if (q.i !== i || q.n !== n || q.lines !== lines || !q.on) this.qa.set({ i, n, lines, on: true });
    }, TICK_MS);
  }

  ngOnDestroy() {
    this.timers.forEach(clearTimeout);
    clearInterval(this.interval);
  }
}
