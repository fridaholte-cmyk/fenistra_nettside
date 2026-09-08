import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-produktteam',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './produktteam.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ProduktteamComponent {}
