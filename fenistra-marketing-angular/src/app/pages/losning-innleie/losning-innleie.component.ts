import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-losning-innleie',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './losning-innleie.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LosningInnleieComponent {}
