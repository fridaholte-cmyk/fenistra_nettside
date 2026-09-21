import { Injectable, inject } from '@angular/core';
import { ConsentService } from './consent/consent.service';
import { HUBSPOT_PORTAL_ID } from './hubspot-form';
import { GoogleTagsService } from './consent/google-tags.service';

// Form "Nettside-chat" in HubSpot (share link: https://2b231t.share-eu1.hsforms.com/28pIt60idTK-8A8wQfG8cSw). Empty = HubSpot logging is off.
// The form must contain the contact properties chat_sporsmal, chat_besvart and chat_side (internal names).
const HUBSPOT_CHAT_FORM_ID = 'f2922deb-489d-4caf-bc03-cc107c6f1c4b';
const MAX_QUESTION_LENGTH = 1000;

/**
 * Logs what visitors ask the chat, so we can see which questions lack an answer.
 * Only runs with consent for "statistikk". No HubSpot cookie (hutk) or IP address is sent.
 */
@Injectable({ providedIn: 'root' })
export class ChatLoggerService {
  private readonly consent = inject(ConsentService);
  private readonly tags = inject(GoogleTagsService);

  get active(): boolean {
    return this.consent.has('statistikk');
  }

  log(question: string, answered: boolean): void {
    if (!this.active) return;
    const q = question.slice(0, MAX_QUESTION_LENGTH);
    const page = location.pathname;

    // Google Analytics via GTM (no question text is sent to Google)
    this.tags.push('chat_question', { answered, page_path: page });

    if (!HUBSPOT_CHAT_FORM_ID) return;
    fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_CHAT_FORM_ID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        fields: [
          { objectTypeId: '0-1', name: 'chat_sporsmal', value: q },
          { objectTypeId: '0-1', name: 'chat_besvart', value: answered ? 'true' : 'false' },
          { objectTypeId: '0-1', name: 'chat_side', value: page },
        ],
        context: { pageUri: location.href, pageName: document.title },
      }),
    }).catch(() => {
      /* logging must never break the chat */
    });
  }
}
