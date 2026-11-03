import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * The shared ending for the «Slik hjelper vi» pages: the proof from the foundation of the message house
 * (kundene, Visma) and the signature with the two ways to get in touch.
 */
@Component({
  selector: 'app-proof-cta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './proof-cta.component.html',
  styleUrl: './proof-cta.component.scss',
})
export class ProofCtaComponent {
  /** the page's own closing line under the signature */
  text = input('Få mer ut av det du forvalter.');
}
