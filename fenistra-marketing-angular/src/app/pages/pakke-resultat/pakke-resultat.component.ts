import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { createHubspotForm, HubspotFormState } from '../../shared/hubspot-form';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-pakke-resultat',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './pakke-resultat.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PakkeResultatComponent implements AfterViewInit {
  formState: HubspotFormState = 'loading';

  ngAfterViewInit() {
    createHubspotForm('#hubspotMeetingForm', 'book_demo', true).then((state) => (this.formState = state));
  }
}
