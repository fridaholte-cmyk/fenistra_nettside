import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-kom-i-gang',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './kom-i-gang.component.html',
  encapsulation: ViewEncapsulation.None
})
export class KomIGangComponent {}
