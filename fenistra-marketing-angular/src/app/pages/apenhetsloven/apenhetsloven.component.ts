import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-apenhetsloven',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './apenhetsloven.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ApenhetslovenComponent {}
