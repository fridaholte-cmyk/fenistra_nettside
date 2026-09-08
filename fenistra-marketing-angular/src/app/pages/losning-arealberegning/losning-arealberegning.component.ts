import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-losning-arealberegning',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './losning-arealberegning.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LosningArealberegningComponent {}
