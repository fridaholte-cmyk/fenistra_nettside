import { Component, ElementRef, OnDestroy, ViewEncapsulation, afterNextRender, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProcessAnimationComponent } from '../../shared/process-animation/process-animation.component';
import { TrustListComponent } from '../../shared/trust-list/trust-list.component';

interface Customer {
  name: string;
  /** Path under public/, e.g. 'images/kunder/thon-gruppen.svg'. Without a logo the name is shown instead. */
  logo?: string;
  /** Customer story to link to, if there is one */
  story?: string;
  /** Rendered height in px, from the logo's aspect ratio so wide wordmarks and square marks look equally heavy */
  logoHeight?: number;
  /** The only available logo is white; it is darkened so it shows on the light background */
  whiteLogo?: boolean;
  /** No logo exists: the name is set as a clear wordmark instead, one line per entry */
  wordmark?: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProcessAnimationComponent, TrustListComponent],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnDestroy {
  // Logo wall: only customers that have approved being shown. Add `logo` as the files arrive.
  customers: Customer[] = [
    { name: 'Olav Thon Gruppen', logo: 'images/kunder/thon-gruppen.svg', logoHeight: 40 },
    { name: 'Mosvold', logo: 'images/kunder/mosvold.svg', logoHeight: 24 },
    { name: 'Smedvig', logo: 'images/kunder/smedvig.jpg', logoHeight: 26 },
    { name: 'Caiano', logo: 'images/kunder/caiano-white.svg', logoHeight: 22, whiteLogo: true },
    { name: 'Pellerin', logo: 'images/kunder/pellerin-white.png', logoHeight: 26, whiteLogo: true },
    { name: 'Hundholmen Byutvikling', logo: 'images/kunder/hundholmen-byutvikling.svg', logoHeight: 22 },
    { name: 'Frydenbø Eiendom', logo: 'images/kunder/frydenbo-eiendom.svg', logoHeight: 22 },
    { name: 'Brødrene Jangaard AS', wordmark: ['Brødrene', 'Jangaard'] },
    { name: 'Koteng', logo: 'images/kunder/koteng.png', logoHeight: 52 },
    { name: 'Aspelin Reitan', logo: 'images/kunder/aspelin-reitan.svg', logoHeight: 23 },
    { name: 'Selvaag Eiendom', logo: 'images/kunder/selvaag-eiendom-white.svg', logoHeight: 31, whiteLogo: true },
    { name: 'Avantor', logo: 'images/kunder/avantor.svg', logoHeight: 19 },
    { name: 'Stor-Oslo Eiendom', logo: 'images/kunder/stor-oslo-eiendom.png', logoHeight: 36 },
    { name: 'Höegh Eiendom', logo: 'images/kunder/hoegh-eiendom.svg', logoHeight: 18, story: '/blogg/hoegh-eiendom-over-to-tiar' },
    { name: 'NPRO', logo: 'images/kunder/npro.svg', logoHeight: 36 },
    { name: 'Union', logo: 'images/kunder/union.webp', logoHeight: 46 },
    { name: 'Tema Eiendom', logo: 'images/kunder/tema-eiendom.svg', logoHeight: 44 },
    // Fra «flere merkevarer»-listen, så veggen holder 3 rader à 7
    { name: 'Backer AS', logo: 'images/kunder/backer.png', logoHeight: 32, story: '/blogg/backer-velger-fenistra' },
    { name: 'Spabo Eiendom', logo: 'images/kunder/spabo-eiendom-white.png', logoHeight: 38, whiteLogo: true },
    { name: 'NIAM', logo: 'images/kunder/niam-white.svg', logoHeight: 24, whiteLogo: true },
    { name: 'Pareto', logo: 'images/kunder/pareto.svg', logoHeight: 34 },
  ];

  // Maren's quote box: hidden in the browser until it scrolls into view, then it fades in (CSS)
  quoteArmed = signal(false);
  quoteShown = signal(false);

  // 60 000 contracts: the prerendered page shows the final number; in the browser
  // it drops to 10 and counts up through every number once the section is in view.
  midCount = signal(60);
  // the other two numbers count up together with it: users (whole hundreds) and square metres (millions)
  usersCount = signal(7000);
  sqmCount = signal(26);
  /** 7000 -> '7 000' (narrow no-break space, as in the rest of the page) */
  thousands = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');

  // Maren's quote (verbatim): once its box has faded in, one word at a time lights up purple, as if read along
  quoteWords = '«Det er en trygghet i å møte en samarbeidspartner som forstår vår særbransje og de utfordringene vi har i hverdagen. Hos Fenistra blir vi møtt med forståelse, og det er godt å jobbe med fagfolk som virkelig kan faget sitt.»'.split(' ');
  quoteRead = signal(0);
  private quoteTimer?: ReturnType<typeof setInterval>;

  // «Bare spør»-illustrasjonen: spørsmålet skrives tegn for tegn når den kommer i bildet (forhåndsrendret: hele teksten)
  askQuestion = 'Hvilke kontrakter har omsetningsleie, og hvilke satser gjelder?';
  askTyped = signal(this.askQuestion.length);
  private askTimer?: ReturnType<typeof setInterval>;

  private frames: number[] = [];
  private onScroll?: () => void;
  private onResize = () => document.documentElement.style.setProperty('--screen-h', innerHeight + 'px');

  constructor(host: ElementRef<HTMLElement>) {
    afterNextRender(() => {
      this.onResize();
      addEventListener('resize', this.onResize, { passive: true });
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      this.quoteArmed.set(true);
      this.midCount.set(10);
      this.usersCount.set(1000);
      this.sqmCount.set(4);
      // Prinsipp-illustrasjonene: skjul innholdet til de er i bildet, og spill dem én gang
      host.nativeElement.querySelectorAll('.pr-anim').forEach((el) => el.classList.add('armed'));
      this.askTyped.set(0);
      const play = (kind: string) => () => {
        host.nativeElement.querySelector(`.pr-anim[data-pr="${kind}"]`)?.classList.add('armed', 'play');
        if (kind === 'ask') this.typeQuestion();
      };

      const watchers: { selector: string; scrolled?: boolean; start: () => void }[] = [
        {
          selector: '.proof-quote figure',
          start: () => {
            this.quoteShown.set(true);
            this.readQuote();
          },
        },
        { selector: '.pr-anim[data-pr="ask"]', start: play('ask') },
        { selector: '.pr-anim[data-pr="alert"]', start: play('alert') },
        { selector: '.pr-anim[data-pr="job"]', start: play('job') },
        {
          selector: '.hp-numbers',
          // only once the visitor has scrolled, never straight on load
          scrolled: true,
          start: () => {
            this.countUp(this.midCount, 10, 60);
            this.countUp(this.usersCount, 1000, 7000, 100);
            this.countUp(this.sqmCount, 4, 26);
          },
        },
      ];

      // Look the elements up on every check rather than holding on to them: the dev server's hot reload
      // can swap the template's DOM, and a held reference (or an IntersectionObserver) would go stale.
      let queued = false;
      const check = () => {
        queued = false;
        for (let i = watchers.length - 1; i >= 0; i--) {
          const el = host.nativeElement.querySelector(watchers[i].selector);
          if (!el) continue;
          const r = el.getBoundingClientRect();
          if (r.top < innerHeight * 0.8 && r.bottom > 0 && (!watchers[i].scrolled || scrollY > 0)) {
            watchers[i].start();
            watchers.splice(i, 1);
          }
        }
        if (!watchers.length) this.stopWatching();
      };
      this.onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(check); } };
      addEventListener('scroll', this.onScroll, { passive: true });
      addEventListener('resize', this.onScroll, { passive: true });
      check();
    });
  }

  /** Counts from `from` to `to` in 1.8 s, slowing down at the end; all three numbers land together */
  private countUp(count: ReturnType<typeof signal<number>>, from: number, to: number, stepSize = 1) {
    const duration = 1800;
    let start = 0;
    const tick = (t: number) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      count.set(Math.round((from + (to - from) * eased) / stepSize) * stepSize);
      if (p < 1) this.frames.push(requestAnimationFrame(tick));
    };
    this.frames.push(requestAnimationFrame(tick));
  }

  /** Skriver spørsmålet i «Bare spør»-illustrasjonen, ca. 2 s totalt (CSS venter 2,2 s før svaret) */
  private typeQuestion() {
    clearInterval(this.askTimer);
    this.askTyped.set(0);
    setTimeout(() => {
      this.askTimer = setInterval(() => {
        this.askTyped.update((n) => n + 1);
        if (this.askTyped() >= this.askQuestion.length) clearInterval(this.askTimer);
      }, 28);
    }, 300);
  }

  /** Starts after the quote box has faded in (CSS: 0.8 s) plus a short pause */
  private readQuote() {
    setTimeout(() => {
      this.quoteTimer = setInterval(() => {
        this.quoteRead.update((n) => n + 1);
        // one step past the last word, so it goes back to the dark colour too
        if (this.quoteRead() > this.quoteWords.length) clearInterval(this.quoteTimer);
      }, 220);
    }, 1400);
  }

  private stopWatching() {
    if (!this.onScroll) return;
    removeEventListener('scroll', this.onScroll);
    removeEventListener('resize', this.onScroll);
    this.onScroll = undefined;
  }

  ngOnDestroy() {
    if (typeof window === 'undefined') return; // prerendering: nothing was started
    removeEventListener('resize', this.onResize);
    this.stopWatching();
    this.frames.forEach((f) => cancelAnimationFrame(f));
    clearInterval(this.quoteTimer);
    clearInterval(this.askTimer);
  }
}
