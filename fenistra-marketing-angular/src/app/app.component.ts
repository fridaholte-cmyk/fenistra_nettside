import { Component, PLATFORM_ID, afterNextRender, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ChatWidgetComponent } from './shared/chat-widget/chat-widget.component';
import { QuizWidgetComponent } from './shared/quiz-widget/quiz-widget.component';
import { CookieBannerComponent } from './shared/consent/cookie-banner.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { PageEffectsService } from './shared/page-effects.service';
import { SeoService } from './shared/seo.service';
import { GoogleTagsService } from './shared/consent/google-tags.service';
import { ConsentService } from './shared/consent/consent.service';
import { PREVIEW_GATE_ENABLED, PREVIEW_GATE_KEY, PREVIEW_GATE_PASSWORD } from './shared/preview-gate';

const LOADER_DELAY_MS = 250;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ChatWidgetComponent, QuizWidgetComponent, CookieBannerComponent, LoaderComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fenistra-marketing-angular';
  unlocked = !PREVIEW_GATE_ENABLED;
  passwordInput = '';
  passwordError = false;
  /** true while a route change takes longer than LOADER_DELAY_MS (slow network / lazy chunk) */
  pageLoading = false;
  private loaderTimer?: ReturnType<typeof setTimeout>;

  constructor(router: Router, effects: PageEffectsService, seo: SeoService, tags: GoogleTagsService, consent: ConsentService) {
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    if (isBrowser && PREVIEW_GATE_ENABLED) {
      try {
        this.unlocked = localStorage.getItem(PREVIEW_GATE_KEY) === 'true';
      } catch {
        this.unlocked = false;
      }
    }

    // Stored consent is read after the first render, so the prerendered HTML and the first client render match
    afterNextRender(() => consent.init());

    if (isBrowser) {
      router.events.subscribe((e) => {
        // skip the first navigation: the prerendered page is already on screen
        if (e instanceof NavigationStart && e.id > 1) {
          clearTimeout(this.loaderTimer);
          this.loaderTimer = setTimeout(() => (this.pageLoading = true), LOADER_DELAY_MS);
        } else if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
          clearTimeout(this.loaderTimer);
          this.pageLoading = false;
        }
      });
    }

    effects.run();
    router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        // title/meta/canonical are set on the server too, so they end up in the prerendered HTML.
        // setTimeout: the router sets the page title after NavigationEnd.
        setTimeout(() => {
          seo.update(router, e.urlAfterRedirects);
          if (isBrowser) {
            tags.push('virtual_page_view', { page_path: e.urlAfterRedirects.split('#')[0], page_title: document.title });
          }
        }, 0);
        if (!isBrowser) return;
        const fragment = e.urlAfterRedirects.split('#')[1];
        effects.run();
        if (fragment) {
          setTimeout(() => document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' }), 0);
        } else {
          window.scrollTo(0, 0);
        }
      });
  }

  submitPassword() {
    if (this.passwordInput === PREVIEW_GATE_PASSWORD) {
      this.unlocked = true;
      this.passwordError = false;
      try {
        localStorage.setItem(PREVIEW_GATE_KEY, 'true');
      } catch {
        /* ignore storage errors */
      }
    } else {
      this.passwordError = true;
    }
  }
}
