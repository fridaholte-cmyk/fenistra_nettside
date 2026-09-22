import { Component, PLATFORM_ID, ViewEncapsulation, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface ErrorInfo {
  title: string;
  message: string;
}

const ERROR_INFO: Record<number, ErrorInfo> = {
  400: {
    title: 'Ugyldig forespørsel',
    message: 'Noe er galt med forespørselen. Sjekk at lenken er riktig, og prøv igjen.',
  },
  403: {
    title: 'Ingen tilgang',
    message: 'Du har ikke tilgang til denne siden. Gå tilbake til forsiden, eller ta kontakt med oss hvis du mener dette er feil.',
  },
  404: {
    title: 'Siden finnes ikke',
    message: 'Siden du leter etter finnes ikke, eller har blitt flyttet. Sjekk at adressen er riktig, eller finn frem via menyen.',
  },
  500: {
    title: 'Noe gikk galt hos oss',
    message: 'Det oppstod en uventet feil. Prøv å laste siden på nytt, eller kom tilbake om litt.',
  },
  503: {
    title: 'Tjenesten er midlertidig utilgjengelig',
    message: 'Siden er nede for vedlikehold eller opplever midlertidig høy trafikk. Prøv igjen om noen minutter.',
  },
  509: {
    title: 'Tjenesten er midlertidig utilgjengelig',
    message: 'Siden er nede for vedlikehold eller opplever midlertidig høy trafikk. Prøv igjen om noen minutter.',
  },
};

const DEFAULT_ERROR: ErrorInfo = ERROR_INFO[404];

/**
 * Azure serves e.g. /403/index.html at the original URL (responseOverrides). The router then
 * matches '**' (404), so on the first load we take the code from the prerendered page instead.
 */
let initialCode: number | null = null;
let initialCodeRead = false;
function takeInitialCode(): number | null {
  if (initialCodeRead) return null;
  initialCodeRead = true;
  return initialCode;
}
export function captureInitialErrorCode(doc: Document): void {
  const v = Number(doc.querySelector('[data-error-code]')?.getAttribute('data-error-code'));
  initialCode = v && ERROR_INFO[v] ? v : null;
}

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './error.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ErrorComponent {
  code: number;
  info: ErrorInfo;

  constructor(route: ActivatedRoute) {
    this.code = Number(route.snapshot.data['code']) || 404;
    if (route.snapshot.data['wildcard'] && isPlatformBrowser(inject(PLATFORM_ID))) {
      const served = takeInitialCode();
      if (served && served !== this.code) {
        this.code = served;
        // the router already set the 404 title; correct it after that
        const title = inject(Title);
        setTimeout(() => title.setTitle(`${served} – ${ERROR_INFO[served].title} | Fenistra`), 0);
      }
    }
    this.info = ERROR_INFO[this.code] ?? DEFAULT_ERROR;
  }
}
