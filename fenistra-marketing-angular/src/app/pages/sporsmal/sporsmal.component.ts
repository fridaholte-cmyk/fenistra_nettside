import { AfterViewInit, Component, ElementRef, OnDestroy, ViewEncapsulation, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router';
import { QuizService } from '../../shared/quiz.service';

const LD_ID = 'ld-faq';

@Component({
  selector: 'app-sporsmal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sporsmal.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SporsmalComponent implements AfterViewInit, OnDestroy {
  private readonly doc = inject(DOCUMENT);
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor(public quiz: QuizService) {}

  /**
   * FAQPage structured data (schema.org), built from the questions in the template so there is a single
   * source. Runs during prerendering too, so it ends up in the static HTML that search engines and AI
   * crawlers read.
   */
  ngAfterViewInit(): void {
    const items = Array.from(this.host.nativeElement.querySelectorAll('.faq-item') as NodeListOf<HTMLElement>);
    const mainEntity = items
      .map((item) => {
        const q = item.querySelector('.faq-q span')?.textContent ?? '';
        const answer = item.querySelector('.faq-a-inner')?.cloneNode(true) as HTMLElement | undefined;
        answer?.querySelectorAll('.btn, .go').forEach((el) => el.remove()); // "Se mer →" buttons aren't part of the answer
        // keep list items and paragraphs apart in the plain text ("Kontrakt. Fakturering." not "KontraktFakturering")
        answer?.querySelectorAll('li, p').forEach((el) => el.appendChild(this.doc.createTextNode(el.tagName === 'LI' ? '. ' : ' ')));
        return { q: clean(q), a: clean(answer?.textContent ?? '') };
      })
      .filter((x) => x.q && x.a)
      .map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } }));

    this.doc.getElementById(LD_ID)?.remove();
    const script = this.doc.createElement('script');
    script.id = LD_ID;
    script.type = 'application/ld+json';
    script.text = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity });
    this.doc.head.appendChild(script);
  }

  ngOnDestroy(): void {
    this.doc.getElementById(LD_ID)?.remove();
  }
}

function clean(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/([.!?:])\s*\.(\s|$)/g, '$1$2') // list items that already end with punctuation
    .trim();
}
