import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface IntSystem { name: string; logo?: string; }
export interface IntCategory { id: string; title: string; intro: string; systems: IntSystem[]; }

/** All integrations on one page. Logos are self-hosted in public/images/integrasjoner (no third-party requests). */
@Component({
  selector: 'app-integrasjoner',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './integrasjoner.component.html',
  encapsulation: ViewEncapsulation.None
})
export class IntegrasjonerComponent {
  categories: IntCategory[] = [
    {
      id: 'regnskap',
      title: 'Regnskap og ERP',
      intro: 'Fakturaer og posteringer fra Fenistra overføres til regnskapssystemet dere allerede bruker, så dere slipper å registrere noe to ganger.',
      systems: [
        { name: 'Tripletex', logo: 'images/integrasjoner/tripletex.svg' },
        { name: 'Xledger', logo: 'images/integrasjoner/xledger.svg' },
        { name: 'PowerOffice GO', logo: 'images/integrasjoner/poweroffice.svg' },
        { name: 'Visma Business NXT', logo: 'images/integrasjoner/business-nxt.svg' },
        { name: 'Visma.net', logo: 'images/integrasjoner/visma-net.svg' },
        { name: '24SevenOffice', logo: 'images/integrasjoner/24sevenoffice.svg' },
        { name: 'Uni Micro', logo: 'images/integrasjoner/uni-micro.svg' },
        { name: 'Microsoft Dynamics', logo: 'images/integrasjoner/dynamics-365.svg' },
        { name: 'Microsoft Dynamics 365 (Axapta)', logo: 'images/integrasjoner/dynamics-365.svg' },
        { name: 'Visma Business', logo: 'images/integrasjoner/visma.svg' },
        { name: 'Visma Global', logo: 'images/integrasjoner/visma.svg' },
        { name: 'Visma Unique', logo: 'images/integrasjoner/visma.svg' },
        { name: 'SAP', logo: 'images/integrasjoner/sap.svg' },
        { name: 'PowerOffice', logo: 'images/integrasjoner/poweroffice.svg' },
        { name: 'Unit4 ERP (Agresso)', logo: 'images/integrasjoner/unit4.jpg' },
        { name: 'Info Easy' },
        { name: 'Infor M3 (Lawson M3)', logo: 'images/integrasjoner/infor.svg' },
        { name: 'Deltek Maconomy', logo: 'images/integrasjoner/deltek.svg' },
        { name: 'Oracle PeopleSoft', logo: 'images/integrasjoner/oracle.svg' },
      ],
    },
    {
      id: 'arsoppgjor',
      title: 'Årsoppgjør',
      intro: 'Fenistra kobles til systemene dere bruker for å utarbeide årsregnskapet og sende det inn til offentlige registre.',
      systems: [
        { name: 'Finale' },
      ],
    },
    {
      id: 'rapportering',
      title: 'Rapportering og analyse',
      intro: 'Kombiner Fenistra-data med verktøy for business intelligence og nøkkeltallsanalyse, så innsikten alltid er oppdatert.',
      systems: [
        { name: 'Power BI', logo: 'images/integrasjoner/powerbi.svg' },
        { name: 'Maestro' },
      ],
    },
    {
      id: 'drift',
      title: 'Drift og vedlikehold',
      intro: 'Informasjonen flyter mellom forvaltning og drift, så driftsavdelingen jobber ut fra de samme dataene som forvaltningen.',
      systems: [
        { name: 'Properly' },
        { name: 'FAMAC' },
      ],
    },
    {
      id: 'kjopesenter',
      title: 'Kjøpesenter',
      intro: 'Besøkstall og andre nøkkeltall fra senteret flyter automatisk inn i Kjøpesenter-modulen og omsetningsrapporteringen.',
      systems: [
        { name: 'Viametrics', logo: 'images/integrasjoner/viametrics.svg' },
        { name: 'IMAS (nå Countmatters)', logo: 'images/integrasjoner/countmatters.jpg' },
      ],
    },
  ];

  total = this.categories.reduce((sum, c) => sum + c.systems.length, 0);
}
