import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blogg-felleskostnadsavregning',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blogg-felleskostnadsavregning.component.html',
  encapsulation: ViewEncapsulation.None
})
export class BloggFelleskostnadsavregningComponent {}
