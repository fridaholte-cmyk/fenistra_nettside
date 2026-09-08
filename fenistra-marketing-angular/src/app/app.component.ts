import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ChatWidgetComponent } from './shared/chat-widget/chat-widget.component';
import { QuizWidgetComponent } from './shared/quiz-widget/quiz-widget.component';
import { PageEffectsService } from './shared/page-effects.service';

const GATE_KEY = 'fenistra_preview_unlocked';
const GATE_PASSWORD = 'fenistra-preview-2026';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ChatWidgetComponent, QuizWidgetComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fenistra-marketing-angular';
  unlocked = false;
  passwordInput = '';
  passwordError = false;

  constructor(router: Router, effects: PageEffectsService) {
    try {
      this.unlocked = localStorage.getItem(GATE_KEY) === 'true';
    } catch {
      this.unlocked = false;
    }

    effects.run();
    router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
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
    if (this.passwordInput === GATE_PASSWORD) {
      this.unlocked = true;
      this.passwordError = false;
      try {
        localStorage.setItem(GATE_KEY, 'true');
      } catch {
        /* ignore storage errors */
      }
    } else {
      this.passwordError = true;
    }
  }
}
