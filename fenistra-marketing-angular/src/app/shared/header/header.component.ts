import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { SearchEntry } from '../data/search-index';
import { searchSite } from '../data/site-search';

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
    this.searchResults = searchSite(value);
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
