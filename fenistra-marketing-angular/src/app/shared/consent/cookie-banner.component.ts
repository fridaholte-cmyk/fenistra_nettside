import { Component, HostListener, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsentService } from './consent.service';
import { rememberFocus } from '../focus-return';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.scss',
})
export class CookieBannerComponent {
  readonly consent = inject(ConsentService);
  optional = false;
  private wasOpen = false;
  private restoreFocus: () => void = () => {};

  constructor() {
    // prefill the toggle with the stored choice whenever the settings open
    effect(() => {
      if (this.consent.settingsOpen()) {
        this.optional = this.consent.state()?.granted ?? false;
        // move focus into the dialog, and back to where the user was when it closes (WCAG 2.4.3)
        this.restoreFocus = rememberFocus();
        setTimeout(() => document.getElementById('cc-settings-title')?.focus(), 0);
        this.wasOpen = true;
      } else if (this.wasOpen) {
        this.wasOpen = false;
        this.restoreFocus();
      }
    });
  }

  saveChoice(): void {
    this.consent.save(this.optional);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.consent.settingsOpen()) this.close();
  }

  close(): void {
    // closing without a stored choice goes back to the banner, it does not imply consent
    this.consent.settingsOpen.set(false);
  }
}
