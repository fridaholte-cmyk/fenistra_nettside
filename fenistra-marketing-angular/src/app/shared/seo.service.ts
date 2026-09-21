import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

const SITE_ORIGIN = 'https://www.fenistra.no';
const DEFAULT_DESCRIPTION =
  'Fenistra samler kontrakter, arealer, felleskostnader og fakturering i én plattform for effektiv eiendomsforvaltning.';

interface ArticleData {
  published: string;
  modified: string;
  author: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly doc = inject(DOCUMENT);

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

    this.setCanonical(noindex ? null : canonical);
    this.setArticleLd(data['article'] as ArticleData | undefined, title, description, canonical);

    if (noindex) {
      this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    } else {
      this.meta.removeTag('name="robots"');
    }
  }

  private setCanonical(href: string | null): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!href) {
      link?.remove();
      return;
    }
    if (!link) {
      link = this.doc.createElement('link');
      link.rel = 'canonical';
      this.doc.head.appendChild(link);
    }
    link.href = href;
  }

  /** Article structured data for pages with `data.article` in app.routes.ts; site-wide data lives in index.html. */
  private setArticleLd(article: ArticleData | undefined, title: string, description: string, url: string): void {
    this.doc.getElementById('ld-article')?.remove();
    if (!article) return;
    const script = this.doc.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'ld-article';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title.replace(/ \| Fenistra$/, ''),
      description,
      url,
      mainEntityOfPage: url,
      datePublished: article.published,
      dateModified: article.modified,
      author: { '@type': 'Person', name: article.author },
      publisher: { '@id': SITE_ORIGIN + '/#organization' },
      inLanguage: 'nb-NO',
    });
    this.doc.head.appendChild(script);
  }

  private deepestData(snapshot: ActivatedRouteSnapshot): Record<string, unknown> {
    let s = snapshot;
    while (s.firstChild) s = s.firstChild;
    return s.data;
  }
}
