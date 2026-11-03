import { ProofCtaComponent } from '../../shared/proof-cta/proof-cta.component';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { JOBBSIDER, Jobbside } from './jobbsider';

/** One template for the solution pages under «Hva vil dere oppnå?»: problem, then Svarer / Sier ifra / Gjør jobben, then the process; the route's data.jobb picks the content. */
@Component({
  selector: 'app-jobbside',
  standalone: true,
  imports: [RouterLink, ProofCtaComponent],
  templateUrl: './jobbside.component.html',
  styleUrl: './jobbside.component.scss'
})
export class JobbsideComponent {
  page: Jobbside;
  others: Jobbside[];
  icons: SafeHtml[];
  /** the three ways the customer notices that Fenistra kan eiendom */
  pillars: { label: string; text: [string, string] }[];

  constructor(route: ActivatedRoute, sanitizer: DomSanitizer) {
    const slug = route.snapshot.data['jobb'] as string;
    this.page = JOBBSIDER.find((p) => p.slug === slug) ?? JOBBSIDER[0];
    const p = this.page.pillars;
    this.pillars = [
      { label: 'Svarer', text: p.svarer },
      { label: 'Sier ifra', text: p.sierIfra },
      { label: 'Gjør jobben', text: p.gjorJobben },
    ];
    this.others = JOBBSIDER.filter((p) => p !== this.page);
    // the icons are our own static SVG markup (jobbsider.ts), never user input
    this.icons = this.page.modules.map((m) => sanitizer.bypassSecurityTrustHtml(m.icon));
  }
}
