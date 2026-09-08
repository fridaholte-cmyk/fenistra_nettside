import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-integrasjoner-alle-systemer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './integrasjoner-alle-systemer.component.html',
  encapsulation: ViewEncapsulation.None
})
export class IntegrasjonerAlleSystemerComponent {}
