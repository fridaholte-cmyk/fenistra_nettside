import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-kundeteam',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './kundeteam.component.html',
  encapsulation: ViewEncapsulation.None
})
export class KundeteamComponent {}
