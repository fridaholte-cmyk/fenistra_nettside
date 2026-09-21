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
  statistikk = false;
  markedsforing = false;

  constructor() {
    // prefill the toggles with the stored choice whenever the settings open
    effect(() => {
      if (this.consent.settingsOpen()) {
        const s = this.consent.state();
        this.statistikk = s?.statistikk ?? false;
        this.markedsforing = s?.markedsforing ?? false;
      }
    });
  }

  saveChoice(): void {
    this.consent.save({ statistikk: this.statistikk, markedsforing: this.markedsforing });
  }

  close(): void {
    // closing without a stored choice goes back to the banner, it does not imply consent
    this.consent.settingsOpen.set(false);
  }
}
