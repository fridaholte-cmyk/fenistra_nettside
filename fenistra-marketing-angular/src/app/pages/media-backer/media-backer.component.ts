import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-media-backer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './media-backer.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MediaBackerComponent {}
