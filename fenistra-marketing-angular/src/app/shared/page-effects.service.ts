import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PageEffectsService {
  private observer?: IntersectionObserver;

  run() {
    // let Angular finish rendering the new route's DOM first
    setTimeout(() => this.setup(), 0);
  }

  private setup() {
    this.observer?.disconnect();

    // scroll reveal
    const revealEls = document.querySelectorAll('.reveal:not(.in)');
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          this.observer?.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => this.observer!.observe(el));

    // faq accordion
    document.querySelectorAll('.faq-item').forEach((item) => {
      if ((item as HTMLElement).dataset['wired']) return;
      (item as HTMLElement).dataset['wired'] = '1';
      const q = item.querySelector('.faq-q');
      const a = item.querySelector<HTMLElement>('.faq-a');
      q?.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach((other) => {
          other.classList.remove('open');
          const otherA = other.querySelector<HTMLElement>('.faq-a');
          if (otherA) otherA.style.maxHeight = '';
        });
        if (!isOpen && a) {
          item.classList.add('open');
          a.style.maxHeight = a.scrollHeight + 'px';
        }
      });
    });

    // marquee duplicate (guard against double-run)
    document.querySelectorAll<HTMLElement>('[id="marqueeTrack"], .marquee-track').forEach((track) => {
      if (track.dataset['duplicated']) return;
      track.dataset['duplicated'] = '1';
      track.innerHTML += track.innerHTML;
    });

    // drawer accordion (mobile menu, if present)
    document.querySelectorAll('.drawer-accordion-trigger').forEach((btn) => {
      if ((btn as HTMLElement).dataset['wired']) return;
      (btn as HTMLElement).dataset['wired'] = '1';
      btn.addEventListener('click', () => {
        const panel = btn.nextElementSibling;
        const isOpen = panel?.classList.contains('open');
        btn.classList.toggle('open', !isOpen);
        panel?.classList.toggle('open', !isOpen);
      });
    });

    // tag filter rows (e.g. løsninger package tags, integrasjoner system tags)
    const filterRow = document.getElementById('filterRow');
    if (filterRow && !(filterRow as HTMLElement).dataset['wired']) {
      (filterRow as HTMLElement).dataset['wired'] = '1';
      const grid = document.getElementById('indexGrid') || document.getElementById('systemGrid');
      const items = grid ? Array.from(grid.querySelectorAll<HTMLElement>('[data-pkg], [data-cat]')) : [];
      filterRow.addEventListener('click', (e) => {
        const btn = (e.target as HTMLElement).closest('button');
        if (!btn) return;
        filterRow.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = (btn as HTMLElement).dataset['filter'] || '';
        items.forEach((item) => {
          const raw = item.dataset['pkg'] ?? item.dataset['cat'] ?? '';
          const tokens = raw.split(/\s+/);
          const show = filter === 'all' || filter === 'alle' || tokens.includes(filter);
          item.style.display = show ? '' : 'none';
        });
      });
    }

    // article download gate (lead-gen modal)
    const gateOpenBtn = document.getElementById('gateOpenBtn');
    const gateBackdrop = document.getElementById('gateBackdrop');
    const gateModal = document.getElementById('gateModal');
    if (gateOpenBtn && gateBackdrop && gateModal && !gateOpenBtn.dataset['wired']) {
      gateOpenBtn.dataset['wired'] = '1';
      const gateCloseBtn = document.getElementById('gateCloseBtn');
      const gateForm = document.getElementById('gateForm') as HTMLFormElement | null;
      const gateFormWrap = document.getElementById('gateFormWrap');
      const gateSuccess = document.getElementById('gateSuccess');
      const downloadLink = gateSuccess?.querySelector<HTMLAnchorElement>('a[download]');

      const resetGate = () => {
        gateForm?.reset();
        if (gateFormWrap) gateFormWrap.style.display = '';
        gateSuccess?.classList.remove('show');
      };
      const openGate = () => {
        gateBackdrop.classList.add('open');
        gateModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      };
      const closeGate = () => {
        gateBackdrop.classList.remove('open');
        gateModal.classList.remove('open');
        document.body.style.overflow = '';
        resetGate();
      };

      gateOpenBtn.addEventListener('click', openGate);
      gateCloseBtn?.addEventListener('click', closeGate);
      gateBackdrop.addEventListener('click', closeGate);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && gateModal.classList.contains('open')) closeGate();
      });

      gateForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (gateFormWrap) gateFormWrap.style.display = 'none';
        gateSuccess?.classList.add('show');
        if (downloadLink) {
          const link = document.createElement('a');
          link.href = downloadLink.href;
          link.download = downloadLink.getAttribute('download') || '';
          document.body.appendChild(link);
          link.click();
          link.remove();
        }
      });
    }
  }
}
