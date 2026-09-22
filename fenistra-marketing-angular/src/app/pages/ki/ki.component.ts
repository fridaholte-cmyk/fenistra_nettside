import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

// The article section ("Fenistra endrer eiendomsbransjen med AI" + download form) is hidden for now.
// Set to true to publish it again.
const SHOW_ARTICLE = false;

@Component({
  selector: 'app-ki',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './ki.component.html',
  encapsulation: ViewEncapsulation.None
})
export class KiComponent {
  readonly showArticle = SHOW_ARTICLE;

  // Scroll straight to the Felix section on this page. Letting the plain link do a fragment
  // navigation makes the browser and the Angular router both scroll, which can make the page jump.
  scrollToFelix(event: MouseEvent): void {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.button !== 0) return; // open in new tab etc.
    event.preventDefault();
    document.getElementById('felix')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(history.state, '', '/ki#felix');
  }
}
