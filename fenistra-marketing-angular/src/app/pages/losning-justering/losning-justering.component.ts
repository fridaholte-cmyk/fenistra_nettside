import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-losning-justering',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './losning-justering.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LosningJusteringComponent {}
