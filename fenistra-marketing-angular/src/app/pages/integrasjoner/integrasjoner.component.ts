import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-integrasjoner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './integrasjoner.component.html',
  encapsulation: ViewEncapsulation.None
})
export class IntegrasjonerComponent {}
