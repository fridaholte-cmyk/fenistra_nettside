import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blogg',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blogg.component.html',
  encapsulation: ViewEncapsulation.None
})
export class BloggComponent {}
