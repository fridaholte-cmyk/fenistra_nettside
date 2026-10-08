import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KiChatDemoComponent } from '../../shared/ki-chat-demo/ki-chat-demo.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, KiChatDemoComponent],
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {}
