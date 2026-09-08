import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-kunder',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './kunder.component.html',
  encapsulation: ViewEncapsulation.None
})
export class KunderComponent {}
