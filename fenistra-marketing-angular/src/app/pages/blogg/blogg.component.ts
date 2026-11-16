import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Article {
  url: string;
  title: string;
  excerpt: string;
  /** Kundehistorie, Produktnytt, Innsikt or Arrangement */
  kind: string;
  /** the article's own main photo */
  img: string;
  /** where to anchor the crop, when the subject isn't in the middle */
  pos?: string;
}

@Component({
  selector: 'app-blogg',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './blogg.component.html',
  encapsulation: ViewEncapsulation.None
})
export class BloggComponent {
  // Newest first; the first one is the featured article at the top. Titles as published.
  articles: Article[] = [
    { url: '/blogg/hoegh-eiendom-over-to-tiar', kind: 'Kundehistorie', title: 'Derfor har Höegh Eiendom brukt Fenistra i over to tiår', excerpt: 'Senior Controller Maren Elise Dalene Torp forteller hvorfor Höegh Eiendom har vært Fenistra-kunde i over 20 år.', img: 'images/media-hoegh-eiendom-01.jpg', pos: '50% 30%' },
    { url: '/blogg/backer-velger-fenistra', kind: 'Kundehistorie', title: 'Backer rigger for fremtiden: velger Fenistra for sin eiendomsforvaltning', excerpt: 'Backer velger Fenistra som nytt forvaltningssystem for sin eiendomsportefølje.', img: 'images/media-backer-01.jpg' },
    { url: '/blogg/mest-komplette-losningen-for-eiendomsforvaltning', kind: 'Produktnytt', title: 'Fenistra: mest komplette løsningen for eiendomsforvaltning', excerpt: 'Slik henger løsningene i Fenistra sammen, fra kontrakt til rapportering.', img: 'images/media-mest-komplette-losningen-01.jpg' },
    { url: '/blogg/fenistra-og-visma-business-nxt', kind: 'Produktnytt', title: 'Fenistra+Business NXT: Full kontroll på økonomi og eiendomsforvaltning', excerpt: 'Fenistra integrert med Visma Business NXT gir full kontroll på økonomi og eiendomsforvaltning i én løsning.', img: 'images/media-business-nxt-02.jpg', pos: '50% 35%' },
    { url: '/blogg/fra-budsjett-til-faktura', kind: 'Produktnytt', title: 'Fra budsjett til faktura: en presis og transparent fordeling', excerpt: 'Fenistra Felleskostnader-budsjett gir presis og transparent fordeling, fra budsjett til faktura.', img: 'images/media-budsjett-til-faktura-01.jpg' },
    { url: '/blogg/fenistra-forenkler-felleskostnadene', kind: 'Kundehistorie', title: 'Fenistra forenkler felleskostnadene', excerpt: 'Kristin Falch om hvordan Fenistra Felleskostavregning eliminerer manuelle rutiner og reduserer feil.', img: 'images/media-forenkler-felleskostnadene-01.jpg' },
    { url: '/blogg/ny-rapport-i-fenistra-kjopesenter', kind: 'Produktnytt', title: 'Ny rapport i Fenistra Kjøpesenter', excerpt: 'Ny rapport lansert i Fenistra Kjøpesenter, for enda bedre innsikt i senterdriften.', img: 'images/media-ny-rapport-kjopesenter-01.jpg' },
    { url: '/blogg/oppsummering-brukerforum-2024', kind: 'Arrangement', title: 'Oppsummering av Fenistra Brukerforum 2024', excerpt: 'Innsikt og innovasjon fra bransjens egne foredragsholdere på Fenistra Brukerforum 2024.', img: 'images/media-brukerforum-2024-oppsummering-01.jpg' },
    { url: '/blogg/fenistra-brukerforum-2024', kind: 'Arrangement', title: 'Fenistra Brukerforum 2024', excerpt: 'Invitasjon til Fenistra Brukerforum 2024, faglig påfyll, nettverksbygging og sosialt samvær.', img: 'images/media-brukerforum-2024-oppsummering-02.jpg', pos: '50% 40%' },
    { url: '/blogg/innhenting-av-mva-erklaringer', kind: 'Innsikt', title: 'Slik sikrer du effektiv innhenting av MVA-erklæringer fra leietakere', excerpt: 'Med Fenistra blir innsamling av MVA-erklæringer en smidig del av driften.', img: 'images/media-mva-erklaringer-01.jpg' },
    { url: '/blogg/brukeropplevelsen-til-neste-niva', kind: 'Produktnytt', title: 'Fenistra tar brukeropplevelsen til neste nivå', excerpt: 'Fenistra flyttes over på ny plattform, med en helt ny og intuitiv brukeropplevelse.', img: 'images/media-brukeropplevelse-neste-niva-01.jpg' },
    { url: '/blogg/kontinuerlig-verdi-for-kundene', kind: 'Innsikt', title: 'Skaper kontinuerlig verdi for kundene i et voksende marked', excerpt: 'Nye Fenistra gir eiendomsselskaper bedre kombinasjon av fleksibilitet, effektivitet og moderne teknologi.', img: 'images/media-kontinuerlig-verdi-01.jpg' },
    { url: '/blogg/oversikt-i-eiendomsportefoljen', kind: 'Innsikt', title: 'Dette må du ha oversikt over i egen eiendomsportefølje', excerpt: 'Fenistra kombinert med Create Insight gir full oversikt over egen eiendomsportefølje og markedsdata.', img: 'images/media-eiendomsportefolje-oversikt-01.jpg' },
  ];
  featured = this.articles[0];
  rest = this.articles.slice(1);
}
