import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-losning-rbo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './losning-rbo.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LosningRboComponent {}
