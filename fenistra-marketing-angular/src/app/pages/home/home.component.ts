import { Component, ElementRef, OnDestroy, ViewEncapsulation, afterNextRender, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProcessAnimationComponent } from '../../shared/process-animation/process-animation.component';
import { HeroAskBoxComponent } from '../../shared/hero-ask-box/hero-ask-box.component';
import { TrustListComponent } from '../../shared/trust-list/trust-list.component';
import { EcosystemComponent } from '../../shared/ecosystem/ecosystem.component';

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
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProcessAnimationComponent, HeroAskBoxComponent, TrustListComponent, EcosystemComponent],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnDestroy {
  // Logo wall: only customers that have approved being shown. Add `logo` as the files arrive.
  customers: Customer[] = [
    { name: 'Thon Gruppen', logo: 'images/kunder/thon-gruppen.svg', logoHeight: 40 },
    { name: 'Coop', logo: 'images/kunder/coop.svg', logoHeight: 26 },
    { name: 'Aspelin Reitan', logo: 'images/kunder/aspelin-reitan.svg', logoHeight: 23 },
    { name: 'Frydenbø Eiendom', logo: 'images/kunder/frydenbo-eiendom.svg', logoHeight: 22 },
    { name: 'Höegh Eiendom', logo: 'images/kunder/hoegh-eiendom.svg', logoHeight: 18, story: '/media-hoegh-eiendom' },
    { name: 'Spabo Eiendom', logo: 'images/kunder/spabo-eiendom-white.png', logoHeight: 38, whiteLogo: true },
    { name: 'Selvaag Eiendom', logo: 'images/kunder/selvaag-eiendom-white.svg', logoHeight: 31, whiteLogo: true },
    { name: 'Mosvold', logo: 'images/kunder/mosvold.svg', logoHeight: 24 },
    { name: 'Alti', logo: 'images/kunder/alti.svg', logoHeight: 45 },
    { name: 'Backer AS', logo: 'images/kunder/backer.png', logoHeight: 32, story: '/media-backer' },
    { name: 'Scala', logo: 'images/kunder/scala-eiendom.svg', logoHeight: 27 },
    { name: 'Norgesgruppen', logo: 'images/kunder/norgesgruppen.png', logoHeight: 34 },
    { name: 'Smedvik Eiendom' },
    { name: 'Avantor', logo: 'images/kunder/avantor.svg', logoHeight: 19 },
    { name: 'Ragde', logo: 'images/kunder/ragde-eiendom.svg', logoHeight: 28 },
    { name: 'Møller', logo: 'images/kunder/moller-eiendom.png', logoHeight: 40 },
    { name: 'Lagunen', logo: 'images/kunder/lagunen.png', logoHeight: 27 },
    { name: 'Stiftelsen Anker', logo: 'images/kunder/stiftelsen-anker.png', logoHeight: 30 },
    { name: 'H.I.Giørtz sønner', logo: 'images/kunder/hi-giortz.svg', logoHeight: 24 },
    { name: 'AKA', logo: 'images/kunder/aka.svg', logoHeight: 33 },
    { name: 'SKB', logo: 'images/kunder/skb-eiendom.png', logoHeight: 46 },
  ];

  // Maren's quote box: hidden in the browser until it scrolls into view, then it fades in (CSS)
  quoteArmed = signal(false);
  quoteShown = signal(false);

  // "Vi kjenner markedet" figures, counted up the same way
  stats = [
    { to: 30, suffix: '+ år', label: 'med fagkunnskap om norsk næringseiendom' },
    { to: 170, suffix: '+', label: 'eiendomsselskaper har valgt Fenistra, fra de største porteføljene til aktører i vekst' },
    { to: 60000, suffix: '+', label: 'leiekontrakter forvaltes i Fenistra.' },
    { to: 60, suffix: ' mrd', label: 'kroner i årlig leie, regulert, fakturert og avregnet riktig' },
  ];
  statValues = signal(this.stats.map((s) => s.to));

  // Maren's quote (verbatim): once its box has faded in, one word at a time lights up purple, as if read along
  quoteWords = '«Det er en trygghet i å møte en samarbeidspartner som forstår vår særbransje og de utfordringene vi har i hverdagen. Hos Fenistra blir vi møtt med forståelse, og det er godt å jobbe med fagfolk som virkelig kan faget sitt.»'.split(' ');
  quoteRead = signal(0);
  private quoteTimer?: ReturnType<typeof setInterval>;

  private frames: number[] = [];
  private onScroll?: () => void;

  constructor(host: ElementRef<HTMLElement>) {
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      this.quoteArmed.set(true);
      this.statValues.set(this.stats.map(() => 0));

      const watchers = [
        {
          selector: '.proof-quote figure',
          start: () => {
            this.quoteShown.set(true);
            this.readQuote();
          },
        },
        {
          selector: '.insight-stats',
          start: () => this.animate(1800, (e) => this.statValues.set(this.stats.map((s) => Math.round(s.to * e)))),
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
          if (r.top < innerHeight * 0.8 && r.bottom > 0) {
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

  formatStat(n: number) {
    return n.toLocaleString('nb-NO');
  }

  private animate(duration: number, step: (eased: number) => void, done?: () => void) {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      step(1 - Math.pow(1 - t, 3));
      if (t < 1) this.frames.push(requestAnimationFrame(tick));
      else done?.();
    };
    this.frames.push(requestAnimationFrame(tick));
  }

  private stopWatching() {
    if (!this.onScroll) return;
    removeEventListener('scroll', this.onScroll);
    removeEventListener('resize', this.onScroll);
    this.onScroll = undefined;
  }

  ngOnDestroy() {
    this.stopWatching();
    this.frames.forEach((f) => cancelAnimationFrame(f));
    clearInterval(this.quoteTimer);
  }
}
