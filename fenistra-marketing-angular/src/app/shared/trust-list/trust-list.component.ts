import { Component, ElementRef, NgZone, OnDestroy, afterNextRender, computed, inject, signal } from '@angular/core';

/**
 * «Valgt av bransjen. Sikret av Visma.»: the four trust points as a list where one point at a time is
 * highlighted, with a progress line along its top edge. Recreated from the Claude Design prototype
 * «Trygt valg forslag v2», variant «4 Liste» (same texts and timing), in the site's own colours.
 * Plays while on screen; clicking a point jumps to it.
 */
const ITEMS = [
  { title: 'En del av Visma Group', text: 'Fenistra er en del av Visma Property Solutions siden 2020.' },
  { title: 'ISO 27001-sertifisert', text: 'Informasjonssikkerheten er sertifisert etter ISO 27001.' },
  { title: '26 integrerte systemer', text: 'Blant dem 19 regnskaps- og ERP-systemer.' },
  { title: 'Fagfolk som kan faget', text: 'Fagkonsulenter og kunderådgivere følger dere fra oppstart og videre.' },
];
const START = 1.4, PER = 3.6;

@Component({
  selector: 'app-trust-list',
  standalone: true,
  templateUrl: './trust-list.component.html',
  styleUrl: './trust-list.component.scss',
})
export class TrustListComponent implements OnDestroy {
  items = ITEMS.map((it, i) => ({ ...it, n: `0${i + 1}` }));
  /** seconds since the section first came into view; -1 before that */
  t = signal(-1);
  private local = computed(() => (this.t() >= 0 ? this.t() - START : -1));
  active = computed(() => (this.local() < 0 ? -1 : Math.floor(this.local() / PER) % ITEMS.length));
  progress = computed(() => (this.local() < 0 ? 0 : (this.local() % PER) / PER));

  private raf?: number;
  private base?: number;
  private io?: IntersectionObserver;
  private play?: () => void;
  private pause?: () => void;

  constructor() {
    const host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    const zone = inject(NgZone);
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.t.set(1); // everything shown, nothing highlighted, no movement
        return;
      }
      zone.runOutsideAngular(() => {
        let last = 0;
        const frame = (now: number) => {
          this.raf = requestAnimationFrame(frame);
          if (now - last < 33) return;
          last = now;
          this.t.set((now - (this.base ?? now)) / 1000);
        };
        this.play = () => {
          if (this.raf) return;
          this.base = this.base == null ? performance.now() : performance.now() - Math.max(0, this.t()) * 1000;
          this.raf = requestAnimationFrame(frame);
        };
        this.pause = () => { if (this.raf) cancelAnimationFrame(this.raf); this.raf = undefined; };
        this.io = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? this.play?.() : this.pause?.())), { threshold: 0.2 });
        this.io.observe(host);
      });
    });
  }

  shown(i: number) {
    return this.t() > 0.4 + i * 0.15;
  }

  jump(i: number) {
    if (!this.play) return;
    this.base = performance.now() - (START + i * PER + 0.01) * 1000;
    this.t.set(START + i * PER + 0.01);
    this.play();
  }

  ngOnDestroy() {
    this.io?.disconnect();
    this.pause?.();
  }
}
