import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ansatte',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ansatte.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AnsatteComponent {}
