import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ki',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ki.component.html',
  encapsulation: ViewEncapsulation.None
})
export class KiComponent {}
