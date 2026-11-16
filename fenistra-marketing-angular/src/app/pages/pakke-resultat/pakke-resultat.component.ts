import { AfterViewInit, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createHubspotForm, embedHubspotFrameForms, HubspotFormState, HUBSPOT_FORM_ID } from '../../shared/hubspot-form';
import { LoaderComponent } from '../../shared/loader/loader.component';

interface FormPage {
  h1: string;
  lead: string;
  h2: string;
  intro: string;
  formId: string;
  /** a form made in HubSpot's new form editor, which uses the newer embed (hs-form-frame) */
  frameForm?: boolean;
  /** form_name in GTM's form_start and generate_lead events */
  formName: string;
}

// One page layout, two forms: the route's data.form picks which
const PAGES: Record<'booking' | 'partner', FormPage> = {
  booking: {
    h1: 'Se Fenistra, tilpasset porteføljen deres',
    lead: 'Fyll ut skjemaet, så tar en av rådgiverne våre kontakt. I møtet viser vi hvordan Fenistra fungerer for akkurat deres kontrakter, selskaper og regler.',
    h2: 'Book et møte',
    intro: 'Fyll ut skjemaet, så tar en av rådgiverne våre kontakt for å avtale tid.',
    formId: HUBSPOT_FORM_ID,
    formName: 'book_demo',
  },
  partner: {
    h1: 'Bli samarbeidspartner',
    lead: 'Forvalter eller fører dere regnskap for eiendomsselskaper? Som samarbeidspartner tilbyr dere tjenestene deres i Fenistra, og kundene får forvaltning i ett system.',
    h2: 'Ta kontakt',
    intro: 'Fortell kort om dere, så tar vi kontakt.',
    // «Bli samarbeidspartner» in HubSpot
    formId: '0ccc855c-eb1d-4557-a811-02aa6a56ee8f',
    frameForm: true,
    formName: 'partner',
  },
};

@Component({
  selector: 'app-pakke-resultat',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './pakke-resultat.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PakkeResultatComponent implements AfterViewInit, OnDestroy {
  page: FormPage;
  formState: HubspotFormState = 'loading';

  constructor(route: ActivatedRoute) {
    this.page = PAGES[(route.snapshot.data['form'] as 'partner') ?? 'booking'] ?? PAGES.booking;
    // no form in HubSpot yet: show the e-mail link straight away
    if (!this.page.formId) this.formState = 'failed';
    // HubSpot's newer embed shows its own loading state
    else if (this.page.frameForm) this.formState = 'ready';
  }

  private stopFrame: () => void = () => {};

  ngAfterViewInit() {
    if (!this.page.formId) return;
    if (this.page.frameForm) {
      this.stopFrame = embedHubspotFrameForms(this.page.formName);
      return;
    }
    createHubspotForm('#hubspotMeetingForm', this.page.formName, this.page.formId, true).then((state) => (this.formState = state));
  }

  ngOnDestroy() {
    this.stopFrame();
  }
}
