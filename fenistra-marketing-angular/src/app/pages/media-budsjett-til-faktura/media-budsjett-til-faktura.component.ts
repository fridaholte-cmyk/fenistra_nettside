import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-media-budsjett-til-faktura',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './media-budsjett-til-faktura.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MediaBudsjettTilFakturaComponent {}
