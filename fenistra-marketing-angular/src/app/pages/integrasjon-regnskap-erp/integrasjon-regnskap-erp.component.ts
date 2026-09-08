import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-integrasjon-regnskap-erp',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './integrasjon-regnskap-erp.component.html',
  encapsulation: ViewEncapsulation.None
})
export class IntegrasjonRegnskapErpComponent {}
