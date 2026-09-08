import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-integrasjon-kjopesenter',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './integrasjon-kjopesenter.component.html',
  encapsulation: ViewEncapsulation.None
})
export class IntegrasjonKjopesenterComponent {}
