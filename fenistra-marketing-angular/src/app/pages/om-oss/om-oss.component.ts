import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-om-oss',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './om-oss.component.html',
  encapsulation: ViewEncapsulation.None
})
export class OmOssComponent {}
