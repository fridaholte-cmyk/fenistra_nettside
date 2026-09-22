import { Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsentService } from './consent.service';

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

  constructor() {
    // prefill the toggle with the stored choice whenever the settings open
    effect(() => {
      if (this.consent.settingsOpen()) {
        this.optional = this.consent.state()?.granted ?? false;
      }
    });
  }

  saveChoice(): void {
    this.consent.save(this.optional);
  }

  close(): void {
    // closing without a stored choice goes back to the banner, it does not imply consent
    this.consent.settingsOpen.set(false);
  }
}
