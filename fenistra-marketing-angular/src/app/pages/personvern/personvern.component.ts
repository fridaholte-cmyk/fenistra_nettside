import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-personvern',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './personvern.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PersonvernComponent {}
