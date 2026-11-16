import { Component, ElementRef, OnDestroy, ViewEncapsulation, afterNextRender, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

const STEPS = 6;
const STEP_MS = 1300;

@Component({
  selector: 'app-om-oss',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './om-oss.component.html',
  encapsulation: ViewEncapsulation.None
})
export class OmOssComponent implements OnDestroy {
  /** «Tre tiår med erfaring»: how many steps are reached (prerendered and with reduced motion: all of them) */
  step = signal(STEPS);
  /** true once the browser has hidden the steps that are still to come */
  armed = signal(false);
  private timer?: ReturnType<typeof setInterval>;
  private onScroll?: () => void;

  constructor(private host: ElementRef<HTMLElement>) {
    afterNextRender(() => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      this.armed.set(true);
      this.step.set(0);
      // plays once, when the timeline is well inside the window
      const check = () => {
        const el = this.host.nativeElement.querySelector('.tl');
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight * 0.75 && r.bottom > 0) {
          this.stopWatching();
          this.play();
        }
      };
      this.onScroll = () => requestAnimationFrame(check);
      addEventListener('scroll', this.onScroll, { passive: true });
      addEventListener('resize', this.onScroll, { passive: true });
      check();
    });
  }

  /** «Se fra start» */
  replay() {
    this.armed.set(true);
    this.step.set(0);
    setTimeout(() => this.play(), 250);
  }

  private play() {
    clearInterval(this.timer);
    this.step.update((n) => n + 1);
    this.timer = setInterval(() => {
      this.step.update((n) => n + 1);
      if (this.step() >= STEPS) clearInterval(this.timer);
    }, STEP_MS);
  }

  private stopWatching() {
    if (!this.onScroll) return;
    removeEventListener('scroll', this.onScroll);
    removeEventListener('resize', this.onScroll);
    this.onScroll = undefined;
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    this.stopWatching();
  }
}
