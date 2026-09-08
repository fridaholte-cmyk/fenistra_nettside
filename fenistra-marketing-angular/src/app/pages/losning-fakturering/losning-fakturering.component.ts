import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-losning-fakturering',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './losning-fakturering.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LosningFaktureringComponent {}
