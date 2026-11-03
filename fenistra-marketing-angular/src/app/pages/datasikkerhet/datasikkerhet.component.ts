import { ProofCtaComponent } from '../../shared/proof-cta/proof-cta.component';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-datasikkerhet',
  standalone: true,
  imports: [RouterLink, ProofCtaComponent],
  templateUrl: './datasikkerhet.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DatasikkerhetComponent {}
