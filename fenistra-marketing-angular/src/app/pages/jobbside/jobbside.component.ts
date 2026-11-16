import { ConceptCardComponent } from '../../shared/concept-card/concept-card.component';
import { ProofCtaComponent } from '../../shared/proof-cta/proof-cta.component';
import { Component, ElementRef, OnDestroy, afterNextRender, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { JOBBSIDER, Jobbside, Prinsipp } from './jobbsider';
import { ProcessAnimationComponent } from '../../shared/process-animation/process-animation.component';

/** One template for the solution pages under «Hva vil dere oppnå?»: problem, then Svarer / Sier ifra / Gjør jobben, then the process; the route's data.jobb picks the content. */
@Component({
  selector: 'app-jobbside',
  standalone: true,
  imports: [RouterLink, ProofCtaComponent, ConceptCardComponent, ProcessAnimationComponent],
  templateUrl: './jobbside.component.html',
  styleUrl: './jobbside.component.scss'
})
export class JobbsideComponent implements OnDestroy {
  page: Jobbside;
  icons: SafeHtml[];
  /** the three principles in full, when the page has them (Økonomisk forvaltning) */
  deep: { label: string; p: Prinsipp }[] | null;
  // narrow the example card's union for the template
  asAsk = (c: Prinsipp['card']) => (c.kind === 'ask' ? c : null);
  asAlert = (c: Prinsipp['card']) => (c.kind === 'alert' ? c : null);
  asJob = (c: Prinsipp['card']) => (c.kind === 'job' ? c : null);
  /** the three ways the customer notices that Fenistra kan eiendom */
  pillars: { label: string; text: [string, string] }[];

  /** «Bare spør» card: how many characters of the question are typed (prerendered: all of it) */
  typed = signal(999);
  private typeTimer?: ReturnType<typeof setInterval>;
  private onScroll?: () => void;

  /** «Gjør jobben» card: [start, done] in seconds per step. Fenistra's steps take 1.2 s; yours waits 3 s for the approval. */
  jobTimes(steps: [string, string, string][]): [number, number][] {
    let t = 0.2;
    return steps.map(([who]) => {
      const start = t, end = t + (who === 'Du' ? 3 : 1.2);
      t = end + 0.2;
      return [Math.round(start * 10) / 10, Math.round(end * 10) / 10];
    });
  }

  constructor(route: ActivatedRoute, sanitizer: DomSanitizer, host: ElementRef<HTMLElement>) {
    const slug = route.snapshot.data['jobb'] as string;
    this.page = JOBBSIDER.find((p) => p.slug === slug) ?? JOBBSIDER[0];
    const p = this.page.pillars;
    this.pillars = [
      { label: 'Svarer', text: p.svarer },
      { label: 'Sier ifra', text: p.sierIfra },
      { label: 'Gjør jobben', text: p.gjorJobben },
    ];
    const d = this.page.deep;
    this.deep = d ? [
      { label: 'Bare spør', p: d.svarer },
      { label: 'Sier ifra', p: d.sierIfra },
      { label: 'Gjør jobben', p: d.gjorJobben },
    ] : null;
    // the icons are our own static SVG markup (jobbsider.ts), never user input
    this.icons = this.page.modules.map((m) => sanitizer.bypassSecurityTrustHtml(m.icon));

    // The example cards play once, like on the front page, when they are well inside the window
    afterNextRender(() => {
      if (!this.deep || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const root = host.nativeElement;
      root.querySelectorAll('.jb-anim').forEach((el) => el.classList.add('armed'));
      this.typed.set(0);
      const left = new Set(['ask', 'alert', 'job']);
      const check = () => {
        for (const kind of [...left]) {
          // looked up on every check: the dev server's hot reload can swap the DOM
          const el = root.querySelector(`.jb-anim[data-anim="${kind}"]`);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.top < innerHeight * 0.8 && r.bottom > 0) {
            el.classList.add('armed', 'play');
            if (kind === 'ask') this.typeQuestion(this.deep![0].p.card.kind === 'ask' ? (this.deep![0].p.card as { q: string }).q.length : 0);
            left.delete(kind);
          }
        }
        if (!left.size) this.stopWatching();
      };
      let queued = false;
      this.onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; check(); }); } };
      addEventListener('scroll', this.onScroll, { passive: true });
      addEventListener('resize', this.onScroll, { passive: true });
      check();
    });
  }

  /** Types the question in about 2 s; the CSS waits 2.2 s before the answer */
  private typeQuestion(length: number) {
    clearInterval(this.typeTimer);
    setTimeout(() => {
      this.typeTimer = setInterval(() => {
        this.typed.update((n) => n + 1);
        if (this.typed() >= length) clearInterval(this.typeTimer);
      }, Math.min(40, 1900 / Math.max(1, length)));
    }, 300);
  }

  private stopWatching() {
    if (!this.onScroll) return;
    removeEventListener('scroll', this.onScroll);
    removeEventListener('resize', this.onScroll);
    this.onScroll = undefined;
  }

  ngOnDestroy() {
    clearInterval(this.typeTimer);
    this.stopWatching();
  }
}
