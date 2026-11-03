import { ProofCtaComponent } from '../../shared/proof-cta/proof-cta.component';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-losning-kjopesenter',
  standalone: true,
  imports: [RouterLink, ProofCtaComponent],
  templateUrl: './losning-kjopesenter.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LosningKjopesenterComponent {}
