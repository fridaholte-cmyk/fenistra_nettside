import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-partnere',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './partnere.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PartnereComponent {
  // Partnere som tilbyr eiendomsforvaltning og/eller regnskap med Fenistra. Logoer hentet fra partnernes egne nettsider (nov. 2026).
  national: Partner[] = [
    { name: 'Aider', logo: 'images/partnere/aider.png', h: 30, url: 'https://www.aider.no', area: 'Kontorer over hele landet', does: 'Regnskap' },
    { name: 'VIEW Procurator', logo: 'images/partnere/view-group.svg', h: 40, url: 'https://viewgroup.no', area: 'Kontorer over hele landet', does: 'Regnskap' },
    { name: 'Njord Eiendomsforvaltning', logo: 'images/partnere/njord-eiendomsforvaltning.svg', h: 20, url: 'https://njordef.no', area: 'Sørlandet, Vestlandet og Østlandet', does: 'Forvaltning' },
    { name: 'Borg Forvaltning', logo: 'images/partnere/borg-forvaltning.png', h: 40, url: 'https://borgforvaltning.no', area: 'Trondheim, Oslo, Bergen og Kristiansund', does: 'Forvaltning og regnskap' },
  ];
  regional: Partner[] = [
    { name: 'Estate Management', logo: 'images/partnere/estate-management-white.svg', h: 24, white: true, url: 'https://estatemanagement.no', area: 'Bergen og Vestlandet', does: 'Forvaltning' },
    { name: 'Vaxa Property', logo: 'images/partnere/vaxa-property.png', h: 34, url: 'https://vaxaproperty.no', area: 'Østlandet', does: 'Forvaltning og regnskap' },
    { name: 'Aksen', logo: 'images/partnere/aksen.svg', h: 36, url: 'https://aksen.no', area: 'Drammen-området', does: 'Forvaltning' },
    { name: 'Forvaltningspartner', logo: 'images/partnere/forvaltningspartner-mark.png', h: 40, withName: true, url: 'https://forvaltningspartner.no', area: 'Kristiansand og Sørlandet', does: 'Forvaltning og regnskap' },
    { name: 'Clarksons Property Management', logo: 'images/partnere/clarksons.svg', h: 22, url: 'https://www.clarksons.com', area: 'Oslo', does: 'Forvaltning' },
  ];
}

interface Partner {
  name: string;
  logo: string;
  /** logo height in px, from the aspect ratio so wide and square marks look equally heavy */
  h: number;
  /** the only available logo is white; darkened on the light card */
  white?: boolean;
  /** the logo is only a mark, so the name is shown next to it */
  withName?: boolean;
  url: string;
  area: string;
  does: string;

}
