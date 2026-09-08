import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blogg-omsetningsleie-kjopesenter',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blogg-omsetningsleie-kjopesenter.component.html',
  encapsulation: ViewEncapsulation.None
})
export class BloggOmsetningsleieKjopesenterComponent {}
