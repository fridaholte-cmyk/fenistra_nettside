import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-losning-tegning',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './losning-tegning.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LosningTegningComponent {}
