import { Component, ElementRef, OnDestroy, afterNextRender, inject, input } from '@angular/core';

export type ConceptKind =
  | 'kontrakter'
  | 'kontrakt'
  | 'felleskost'
  | 'fakturering'
  | 'rapport'
  | 'senter'
  | 'ukesrapport';

/**
 * Konseptuelle illustrasjoner i stedet for skjermbilder fra systemet (november 2026).
 * Same visual language as the «Bare spør / Sier ifra / Gjør jobben» cards on the home page:
 * a white card, mono labels, a few rows and simple bars. Fictional examples only.
 * Rows fade in and bars grow when the card comes into view; with reduced motion the end state shows.
 */
@Component({
  selector: 'app-concept-card',
  standalone: true,
  templateUrl: './concept-card.component.html',
  styleUrl: './concept-card.component.scss',
  host: { 'aria-hidden': 'true' },
})
export class ConceptCardComponent implements OnDestroy {
  kind = input.required<ConceptKind>();

  readonly days = [
    { d: 'Man', a: 45, b: 41 }, { d: 'Tir', a: 44, b: 45 }, { d: 'Ons', a: 53, b: 48 },
    { d: 'Tor', a: 61, b: 55 }, { d: 'Fre', a: 79, b: 72 }, { d: 'Lør', a: 100, b: 90 },
    { d: 'Søn', a: 25, b: 22 },
  ];
  readonly months = [62, 64, 63, 68, 70, 71, 69, 74, 77, 78, 82, 86];

  private io?: IntersectionObserver;

  constructor() {
    const host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
      host.classList.add('armed');
      this.io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          host.classList.add('play');
          this.io?.disconnect();
        }
      }, { threshold: 0.35 });
      this.io.observe(host);
    });
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }
}
