import { Component, ViewEncapsulation } from '@angular/core';
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
    this.info = ERROR_INFO[this.code] ?? DEFAULT_ERROR;
  }
}
