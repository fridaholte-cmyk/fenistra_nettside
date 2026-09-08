import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-losning-felleskostnader',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './losning-felleskostnader.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LosningFelleskostnaderComponent {}
