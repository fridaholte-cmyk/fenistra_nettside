import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-integrasjon-arsoppgjor',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './integrasjon-arsoppgjor.component.html',
  encapsulation: ViewEncapsulation.None
})
export class IntegrasjonArsoppgjorComponent {}
