import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-losning-inntektsbudsjett',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './losning-inntektsbudsjett.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LosningInntektsbudsjettComponent {}
