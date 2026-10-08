import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface ErpSystem { name: string; logo?: string; }

@Component({
  selector: 'app-integrasjon-regnskap-erp',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './integrasjon-regnskap-erp.component.html',
  encapsulation: ViewEncapsulation.None
})
export class IntegrasjonRegnskapErpComponent {
  /** All accounting/ERP systems Fenistra integrates with. Logos are self-hosted in public/images/integrasjoner. */
  systems: ErpSystem[] = [
    { name: 'Tripletex', logo: 'images/integrasjoner/tripletex.svg' },
    { name: 'Xledger', logo: 'images/integrasjoner/xledger.svg' },
    { name: 'PowerOffice GO', logo: 'images/integrasjoner/poweroffice.svg' },
    { name: 'Visma Business NXT', logo: 'images/integrasjoner/visma.svg' },
    { name: 'Visma.net', logo: 'images/integrasjoner/visma.svg' },
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
  ];
}
