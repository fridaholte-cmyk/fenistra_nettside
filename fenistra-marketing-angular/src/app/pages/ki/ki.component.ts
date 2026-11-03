import { ProofCtaComponent } from '../../shared/proof-cta/proof-cta.component';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KiChatDemoComponent } from '../../shared/ki-chat-demo/ki-chat-demo.component';

@Component({
  selector: 'app-ki',
  standalone: true,
  imports: [RouterLink, ProofCtaComponent, KiChatDemoComponent],
  templateUrl: './ki.component.html',
  encapsulation: ViewEncapsulation.None
})
export class KiComponent {
  // Scroll straight to the «gjør jobben» section on this page. Letting the plain link do a fragment
  // navigation makes the browser and the Angular router both scroll, which can make the page jump.
  scrollToProcess(event: MouseEvent): void {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) return; // open in new tab etc.
    event.preventDefault();
    document.getElementById('gjor-jobben')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(history.state, '', 'ki#gjor-jobben'); // relativ, så base-href følges
  }
}
