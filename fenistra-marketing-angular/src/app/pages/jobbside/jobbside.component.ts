import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { JOBBSIDER, Jobbside } from './jobbsider';

/** One template for the four "jobs" under Løsninger; the route's data.jobb picks the content. */
@Component({
  selector: 'app-jobbside',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './jobbside.component.html',
  styleUrl: './jobbside.component.scss'
})
export class JobbsideComponent {
  page: Jobbside;
  others: Jobbside[];
  icons: SafeHtml[];
  /** name for use mid-sentence: lower-case first letter, but keep acronyms like MVA */
  nameInSentence: string;

  constructor(route: ActivatedRoute, sanitizer: DomSanitizer) {
    const slug = route.snapshot.data['jobb'] as string;
    this.page = JOBBSIDER.find((p) => p.slug === slug) ?? JOBBSIDER[0];
    const n = this.page.name;
    this.nameInSentence = /^[A-ZÆØÅ]{2}/.test(n) ? n : n.charAt(0).toLowerCase() + n.slice(1);
    this.others = JOBBSIDER.filter((p) => p !== this.page);
    // the icons are our own static SVG markup (jobbsider.ts), never user input
    this.icons = this.page.modules.map((m) => sanitizer.bypassSecurityTrustHtml(m.icon));
  }
}
