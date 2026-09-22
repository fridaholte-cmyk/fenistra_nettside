import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { createHubspotForm, HubspotFormState } from '../../shared/hubspot-form';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-kontakt-oss',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './kontakt-oss.component.html',
  encapsulation: ViewEncapsulation.None
})
export class KontaktOssComponent implements AfterViewInit {
  formState: HubspotFormState = 'loading';
  ngAfterViewInit() {
    createHubspotForm('#hubspotContactForm', 'kontakt_oss').then((state) => (this.formState = state));
  }
}
