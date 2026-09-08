import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-losning-regnskap',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './losning-regnskap.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LosningRegnskapComponent {}
