import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-om-oss-siste-versjon',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './om-oss-siste-versjon.component.html',
  encapsulation: ViewEncapsulation.None
})
export class OmOssSisteVersjonComponent {}
