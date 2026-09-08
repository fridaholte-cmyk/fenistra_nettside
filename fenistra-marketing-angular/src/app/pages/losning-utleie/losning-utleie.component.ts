import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-losning-utleie',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './losning-utleie.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LosningUtleieComponent {}
