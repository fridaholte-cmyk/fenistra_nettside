import { Component, ViewEncapsulation, inject } from '@angular/core';
import { ConsentService } from '../../shared/consent/consent.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cookies.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CookiesComponent {
  readonly consent = inject(ConsentService);
}
