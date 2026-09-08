import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-media-eiendomsportefolje-oversikt',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './media-eiendomsportefolje-oversikt.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MediaEiendomsportefoljeOversiktComponent {}
