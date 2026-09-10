import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { createHubspotForm } from '../../shared/hubspot-form';

@Component({
  selector: 'app-kontakt-oss',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './kontakt-oss.component.html',
  encapsulation: ViewEncapsulation.None
})
export class KontaktOssComponent implements AfterViewInit {
  ngAfterViewInit() {
    createHubspotForm('#hubspotContactForm');
  }
}
