import { ChangeDetectorRef, Component, ElementRef, OnDestroy, afterNextRender } from '@angular/core';

/**
 * Illustrated KI-assistent conversation (HTML/CSS, not a screenshot). The messages play in once the
 * card scrolls into view. The data shown is example data.
 */
@Component({
  selector: 'app-ki-chat-demo',
  standalone: true,
  templateUrl: './ki-chat-demo.component.html',
  styleUrl: './ki-chat-demo.component.scss'
})
export class KiChatDemoComponent implements OnDestroy {
  playing = false;
  private observer?: IntersectionObserver;

  constructor(host: ElementRef<HTMLElement>, cdr: ChangeDetectorRef) {
    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) { this.playing = true; cdr.detectChanges(); return; }
      this.observer = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.playing = true;
          cdr.detectChanges(); // the observer callback runs outside Angular's change detection
          this.observer?.disconnect();
        }
      }, { threshold: 0.35 });
      this.observer.observe(host.nativeElement);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
