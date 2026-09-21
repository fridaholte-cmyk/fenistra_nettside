import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsentService } from '../consent/consent.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  readonly consent = inject(ConsentService);
}
