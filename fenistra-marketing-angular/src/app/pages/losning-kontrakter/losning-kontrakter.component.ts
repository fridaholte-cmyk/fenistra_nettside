import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-losning-kontrakter',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './losning-kontrakter.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LosningKontrakterComponent {}
