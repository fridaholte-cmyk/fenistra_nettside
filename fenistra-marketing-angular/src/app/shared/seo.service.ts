import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

const SITE_ORIGIN = 'https://www.fenistra.no';
const DEFAULT_DESCRIPTION =
  'Fenistra samler kontrakter, arealer, felleskostnader og fakturering i én plattform for effektiv eiendomsforvaltning.';

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(private meta: Meta, private titleService: Title) {}

  update(router: Router, url: string): void {
    const data = this.deepestData(router.routerState.snapshot.root);
    const description = (data['description'] as string) || DEFAULT_DESCRIPTION;
    const noindex = !!data['noindex'];
    const title = this.titleService.getTitle();
    const path = url.split('#')[0].split('?')[0];
    const canonical = SITE_ORIGIN + (path === '/' ? '/' : path);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Fenistra' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    if (noindex) {
      this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    } else {
      this.meta.removeTag('name="robots"');
    }
  }

  private deepestData(snapshot: ActivatedRouteSnapshot): Record<string, unknown> {
    let s = snapshot;
    while (s.firstChild) s = s.firstChild;
    return s.data;
  }
}
