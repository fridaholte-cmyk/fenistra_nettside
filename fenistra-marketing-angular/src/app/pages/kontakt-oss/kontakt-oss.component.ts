import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-kontakt-oss',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './kontakt-oss.component.html',
  encapsulation: ViewEncapsulation.None
})
export class KontaktOssComponent {}
