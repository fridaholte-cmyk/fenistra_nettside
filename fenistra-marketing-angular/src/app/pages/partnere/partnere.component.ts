import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-partnere',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './partnere.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PartnereComponent {
  // Partnere som tilbyr eiendomsforvaltning med Fenistra. Legg til logo og lenke når vi har dem.
  partners = ['View Procurator', 'Aider', 'Njord', 'Borg', 'Estate Management'];
}
