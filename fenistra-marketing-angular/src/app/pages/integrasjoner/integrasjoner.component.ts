import { ProofCtaComponent } from '../../shared/proof-cta/proof-cta.component';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface IntSystem {
  name: string;
  logo?: string;
  /** max height in px for logos that are nearly square (default 26) */
  h?: number;
}

/** All integrations on one page. Logos are self-hosted in public/images/integrasjoner (no third-party requests). */
@Component({
  selector: 'app-integrasjoner',
  standalone: true,
  imports: [RouterLink, ProofCtaComponent],
  templateUrl: './integrasjoner.component.html',
  encapsulation: ViewEncapsulation.None
})
export class IntegrasjonerComponent {
  // Alle integrerte systemer i én blandet liste, uten kategorier og antall.
  systems: IntSystem[] = [
    { name: 'Tripletex', logo: 'images/integrasjoner/tripletex.svg' },
    { name: 'Finale', logo: 'images/integrasjoner/finale.png', h: 36 },
    { name: 'Power BI', logo: 'images/integrasjoner/powerbi.svg' },
    { name: 'Propely', logo: 'images/integrasjoner/propely.png' },
    { name: 'Viametrics', logo: 'images/integrasjoner/viametrics.svg' },
    { name: 'Xledger', logo: 'images/integrasjoner/xledger.svg' },
    { name: 'Maestro', logo: 'images/integrasjoner/maestro.png' },
    { name: 'FAMAC', logo: 'images/integrasjoner/famac.png' },
    { name: 'IMAS (nå Countmatters)', logo: 'images/integrasjoner/countmatters.jpg' },
    { name: 'PowerOffice GO', logo: 'images/integrasjoner/poweroffice-go.png' },
    { name: 'Visma Business NXT', logo: 'images/integrasjoner/business-nxt.svg' },
    { name: 'Visma.net', logo: 'images/integrasjoner/visma-net.svg' },
    { name: '24SevenOffice', logo: 'images/integrasjoner/24sevenoffice.svg' },
    { name: 'Uni Micro', logo: 'images/integrasjoner/uni-micro.svg' },
    { name: 'Microsoft Dynamics', logo: 'images/integrasjoner/dynamics-365.svg' },
    { name: 'Microsoft Dynamics 365 (Axapta)', logo: 'images/integrasjoner/dynamics-365.svg' },
    { name: 'Visma Business', logo: 'images/integrasjoner/visma-business.png' },
    { name: 'Visma Global', logo: 'images/integrasjoner/visma-global.png' },
    { name: 'Visma Unique', logo: 'images/integrasjoner/visma.svg' },
    { name: 'SAP', logo: 'images/integrasjoner/sap.svg' },
    { name: 'PowerOffice', logo: 'images/integrasjoner/poweroffice.png' },
    { name: 'Unit4 ERP (Agresso)', logo: 'images/integrasjoner/unit4.jpg' },
    { name: 'Vitec (tidligere Info Easy)' },
    { name: 'Infor M3 (Lawson M3)', logo: 'images/integrasjoner/infor.svg' },
    { name: 'Deltek Maconomy', logo: 'images/integrasjoner/deltek.svg' },
    { name: 'Oracle PeopleSoft', logo: 'images/integrasjoner/oracle.svg' },
  ];
}
