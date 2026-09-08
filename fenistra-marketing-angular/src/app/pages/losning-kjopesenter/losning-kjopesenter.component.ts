import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-losning-kjopesenter',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './losning-kjopesenter.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LosningKjopesenterComponent {}
