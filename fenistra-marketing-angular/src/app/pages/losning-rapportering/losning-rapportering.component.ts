import { ConceptCardComponent } from '../../shared/concept-card/concept-card.component';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-losning-rapportering',
  standalone: true,
  imports: [ConceptCardComponent, RouterLink],
  templateUrl: './losning-rapportering.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LosningRapporteringComponent {}
