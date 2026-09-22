import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { FENISTRA_SEARCH_INDEX, SearchEntry } from '../data/search-index';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  scrolled = false;
  mobileDrawerOpen = false;
  /** which mobile-menu section is expanded (only one at a time) */
  openSection: string | null = null;
  searchOpen = false;
  searchQuery = '';
  searchResults: SearchEntry[] = [];

  constructor(private router: Router, @Inject(DOCUMENT) private doc: Document) {}

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = (window.scrollY || document.documentElement.scrollTop) > 8;
  }

  openMobileDrawer() {
    this.mobileDrawerOpen = true;
    this.doc.body.classList.add('drawer-open'); // stop the page behind from scrolling
  }
  closeMobileDrawer() {
    this.mobileDrawerOpen = false;
    this.openSection = null;
    this.doc.body.classList.remove('drawer-open');
  }
  toggleSection(section: string) {
    this.openSection = this.openSection === section ? null : section;
  }

  openSearch() {
    this.searchOpen = true;
    setTimeout(() => document.getElementById('searchInput')?.focus(), 50);
  }
  closeSearch() { this.searchOpen = false; }

  onSearchInput(value: string) {
    this.searchQuery = value;
    // "KI" og "kunstig intelligens" er synonymer for AI i søket
    const q = value.trim().toLowerCase()
      .replace(/kunstig intelligens|\bk\.?i\b/g, 'ai');
    if (!q) {
      this.searchResults = [];
      return;
    }
    this.searchResults = FENISTRA_SEARCH_INDEX
      .map((item) => {
        const title = item.title.toLowerCase().replace(/kunstig intelligens/g, 'ai');
        let score = -1;
        if (title === q) score = 4;
        else if (title.startsWith(q)) score = 3;
        else if (title.includes(q)) score = 2;
        else if (item.category.toLowerCase().includes(q) || item.desc.toLowerCase().replace(/kunstig intelligens/g, 'ai').includes(q)) score = 1;
        return { item, score };
      })
      .filter((r) => r.score >= 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)
      .map((r) => r.item);
  }

  toRoute(url: string): string {
    const slug = url.replace(/\.html$/, '');
    return slug === 'index' ? '/' : '/' + slug;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeMobileDrawer();
    this.searchOpen = false;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.openSearch();
    }
  }
}
