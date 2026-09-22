import { Component, Input } from '@angular/core';

/**
 * Fenistra loading indicator: the F in a berry bubble with two halos that pulse out and in
 * (after the "Fenistra | Components" spinner variants 1–6).
 */
@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
    <span class="fl" [class.fl-sm]="size === 'sm'" role="status" [attr.aria-label]="label">
      <span class="fl-halo fl-halo-outer" aria-hidden="true"></span>
      <span class="fl-halo fl-halo-inner" aria-hidden="true"></span>
      <span class="fl-core" aria-hidden="true">
        <svg viewBox="9 9.5 26 26" focusable="false">
          <path d="M33.8125 13.9141H21.8594V17.8516H33.8125V13.9141Z" />
          <path d="M21.5078 18.2031H17.5703V22.2109H9.625V26.1484H17.5703V34.0938H21.5078V26.1484H25.5156V22.2109H21.5078V18.2031Z" />
          <path d="M17.6406 10.2578H13.5625V14.3359H17.6406V10.2578Z" />
        </svg>
      </span>
    </span>
  `,
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  @Input() size: 'md' | 'sm' = 'md';
  @Input() label = 'Laster inn';
}
