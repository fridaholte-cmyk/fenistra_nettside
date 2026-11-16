import { ConceptCardComponent } from '../../shared/concept-card/concept-card.component';
import { KiChatDemoComponent } from '../../shared/ki-chat-demo/ki-chat-demo.component';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GRUPPER } from './grupper';

/**
 * Løsninger: one page with everything about what Fenistra does (november 2026). It merges the former
 * «Alt i Fenistra», «Slik hjelper vi» and «Kom i gang» pages, whose addresses now redirect to the
 * sections here (#alt-i-fenistra, #slik-hjelper-fenistra, #kom-i-gang), so people, search engines and
 * AI assistants find one consistent answer in one place.
 */
@Component({
  selector: 'app-losninger',
  standalone: true,
  imports: [RouterLink, ConceptCardComponent, KiChatDemoComponent],
  templateUrl: './losninger.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LosningerComponent {
  grupper = GRUPPER;
}
