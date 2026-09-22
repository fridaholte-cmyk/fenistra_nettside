import { Component, HostListener, OnDestroy, ViewEncapsulation, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';

interface LightboxImage {
  src: string;
  alt: string;
}

interface Lightbox {
  images: LightboxImage[];
  index: number;
  opener: HTMLElement;
}

const SWIPE_MIN_PX = 50;

@Component({
  selector: 'app-fenistradagene',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './fenistradagene.component.html',
  encapsulation: ViewEncapsulation.None
})
export class FenistradageneComponent implements OnDestroy {
  private readonly doc = inject(DOCUMENT);
  readonly lightbox = signal<Lightbox | null>(null);
  private swipeStartX: number | null = null;
  private justSwiped = false;

  /** Clicking a gallery photo opens it large in the lightbox instead of opening the file. */
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) return; // new tab etc. still works
    const link = (event.target as Element | null)?.closest?.('.carousel-track a, a[data-lightbox]') as HTMLAnchorElement | null;
    if (!link) return;
    event.preventDefault();
    // a gallery opens with all its photos; a single photo (data-lightbox) opens on its own
    const track = link.closest('.carousel-track');
    const links = track ? Array.from(track.querySelectorAll('a')) : [link];
    const images = links.map((a) => ({
      src: a.getAttribute('href') ?? '',
      alt: a.querySelector('img')?.getAttribute('alt') ?? '',
    }));
    this.lightbox.set({ images, index: links.indexOf(link), opener: link });
    this.doc.body.classList.add('lb-open');
    setTimeout(() => this.doc.querySelector<HTMLElement>('.lb-close')?.focus());
  }

  @HostListener('document:keydown', ['$event'])
  onKey(event: KeyboardEvent): void {
    if (!this.lightbox()) return;
    if (event.key === 'Escape') this.close();
    else if (this.lightbox()!.images.length < 2) return;
    else if (event.key === 'ArrowRight') this.step(1);
    else if (event.key === 'ArrowLeft') this.step(-1);
  }

  step(delta: number): void {
    this.lightbox.update((lb) =>
      lb ? { ...lb, index: (lb.index + delta + lb.images.length) % lb.images.length } : lb
    );
  }

  close(): void {
    const opener = this.lightbox()?.opener;
    this.lightbox.set(null);
    this.doc.body.classList.remove('lb-open');
    opener?.focus();
  }

  /** Clicks on the dark area around the photo close it; clicks on the photo or buttons don't. */
  onBackdrop(event: MouseEvent): void {
    if (this.justSwiped) {
      this.justSwiped = false; // the click that ends a swipe shouldn't close the lightbox
      return;
    }
    if (event.target === event.currentTarget || (event.target as Element).classList.contains('lb-stage')) this.close();
  }

  ngOnDestroy(): void {
    this.doc.body.classList.remove('lb-open'); // leaving the page with the lightbox open
  }

  swipeStart(event: PointerEvent): void {
    this.swipeStartX = event.clientX;
  }

  swipeEnd(event: PointerEvent): void {
    if (this.swipeStartX === null) return;
    const dx = event.clientX - this.swipeStartX;
    this.swipeStartX = null;
    if (Math.abs(dx) >= SWIPE_MIN_PX) {
      this.justSwiped = true;
      this.step(dx < 0 ? 1 : -1);
    }
  }
}
