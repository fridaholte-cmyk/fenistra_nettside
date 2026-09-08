import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-losning-omsetningsavregning',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './losning-omsetningsavregning.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LosningOmsetningsavregningComponent {}
