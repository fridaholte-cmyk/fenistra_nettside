import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-integrasjon-rapportering',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './integrasjon-rapportering.component.html',
  encapsulation: ViewEncapsulation.None
})
export class IntegrasjonRapporteringComponent {}
