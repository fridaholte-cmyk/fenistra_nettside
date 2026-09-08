import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-losning-dokument',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './losning-dokument.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LosningDokumentComponent {}
