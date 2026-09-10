import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FENISTRA_CHAT_KB, ChatKbEntry } from '../data/chat-knowledge';

interface ChatMessage {
  html: string;
  who: 'bot' | 'user';
  suggestions?: string[];
}

const DEFAULT_SUGGESTIONS = [
  'Hva er Fenistra?',
  'Hva inneholder Standard?',
  'Kan dere integreres med vårt regnskapssystem?'
];

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-widget.component.html'
})
export class ChatWidgetComponent {
  open = false;
  draft = '';
  messages: ChatMessage[] = [];
  private greeted = false;

  @ViewChild('messagesEl') messagesEl?: ElementRef<HTMLElement>;
  @ViewChild('chatInputEl') chatInputEl?: ElementRef<HTMLInputElement>;

  constructor(private router: Router) {}

  openChat() {
    this.open = true;
    if (!this.greeted) {
      this.addMessage(
        'Hei! Jeg er Fenistra-assistenten. Spør meg om løsninger, integrasjoner eller pakker - finner jeg ikke svaret, henviser jeg deg videre til support/salg.',
        'bot',
        DEFAULT_SUGGESTIONS
      );
      this.greeted = true;
    }
    setTimeout(() => this.chatInputEl?.nativeElement.focus(), 60);
  }

  closeChat() {
    this.open = false;
  }

  submitForm() {
    this.handleSend(this.draft);
    this.draft = '';
  }

  handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    this.addMessage(this.escapeHtml(trimmed), 'user');
    setTimeout(() => {
      const answer = this.findAnswer(trimmed);
      if (answer) {
        this.addMessage(this.fixLinks(answer), 'bot');
      } else {
        this.addMessage(
          'Jeg fant dessverre ikke et godt svar på det her. Ta gjerne kontakt med oss, så hjelper vi deg videre:' +
          '<br><br>Se kontaktinfo til <a href="/kundeteam" data-internal>kundeteamet</a>, eller <a href="/pakke-resultat" data-internal>book en demo</a>.' +
          '<br><br>Du finner også svar på flere vanlige spørsmål på <a href="/sporsmal" data-internal>spørsmål-siden</a>.',
          'bot'
        );
      }
    }, 450);
  }

  onMessagesClick(e: MouseEvent) {
    const anchor = (e.target as HTMLElement).closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href') || '';
    if (href.startsWith('/')) {
      e.preventDefault();
      this.router.navigateByUrl(href);
      this.closeChat();
    }
  }

  private addMessage(html: string, who: 'bot' | 'user', suggestions?: string[]) {
    this.messages.push({ html, who, suggestions });
    setTimeout(() => {
      const el = this.messagesEl?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    }, 0);
  }

  private findAnswer(query: string): string | null {
    const q = ' ' + query.toLowerCase() + ' ';
    let best: ChatKbEntry | null = null;
    let bestScore = 0;
    FENISTRA_CHAT_KB.forEach((entry) => {
      let score = 0;
      entry.keywords.forEach((kw) => {
        if (q.includes(kw.toLowerCase())) score++;
      });
      if (score > bestScore) {
        bestScore = score;
        best = entry;
      }
    });
    return bestScore > 0 && best ? (best as ChatKbEntry).answer : null;
  }

  private escapeHtml(str: string): string {
    return str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' } as Record<string, string>)[c]);
  }

  private fixLinks(html: string): string {
    return html.replace(/href="([a-z0-9-]+)\.html(#[a-z0-9-]+)?"/gi, (_m, slug, hash) => {
      const path = slug === 'index' ? '/' : '/' + slug;
      return `href="${path}${hash || ''}" data-internal`;
    });
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.open = false;
  }
}
