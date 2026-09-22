import { Component, HostListener, Inject } from '@angular/core';
import { rememberFocus } from '../focus-return';
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

  private restoreDrawerFocus: () => void = () => {};

  openMobileDrawer() {
    this.restoreDrawerFocus = rememberFocus();
    this.mobileDrawerOpen = true;
    this.doc.body.classList.add('drawer-open'); // stop the page behind from scrolling
    setTimeout(() => this.doc.getElementById('closeDrawer')?.focus(), 50);
  }
  closeMobileDrawer() {
    if (!this.mobileDrawerOpen) return;
    this.mobileDrawerOpen = false;
    this.restoreDrawerFocus();
    this.openSection = null;
    this.doc.body.classList.remove('drawer-open');
  }
  toggleSection(section: string) {
    this.openSection = this.openSection === section ? null : section;
  }

  private restoreSearchFocus: () => void = () => {};

  openSearch() {
    if (this.searchOpen) return;
    this.restoreSearchFocus = rememberFocus();
    this.searchOpen = true;
    setTimeout(() => document.getElementById('searchInput')?.focus(), 50);
  }
  closeSearch() {
    if (!this.searchOpen) return;
    this.searchOpen = false;
    this.restoreSearchFocus();
  }

  onSearchInput(value: string) {
    this.searchQuery = value;
    this.searchResults = searchSite(value);
  }

  toRoute(url: string): string {
    const slug = url.replace(/\.html$/, '');
    return slug === 'index' ? '/' : '/' + slug;
  }

  // Mega menus open on hover and focus (CSS). The state below only drives aria-expanded and lets
  // Esc dismiss an open menu without moving the pointer or focus away (WCAG 1.4.13).
  openMenu: string | null = null;
  dismissedMenu: string | null = null;

  private menuOpenedAt = 0;

  menuEnter(name: string) {
    if (this.dismissedMenu !== name && this.openMenu !== name) {
      this.openMenu = name;
      this.menuOpenedAt = Date.now();
    }
  }
  menuLeave(name: string) {
    if (this.openMenu === name) this.openMenu = null;
    if (this.dismissedMenu === name) this.dismissedMenu = null;
  }
  menuFocusOut(name: string, event: FocusEvent) {
    const li = event.currentTarget as HTMLElement;
    if (!li.contains(event.relatedTarget as Node | null)) this.menuLeave(name);
  }
  menuToggle(name: string) {
    // click/tap on the trigger (also makes the menu usable on touch screens)
    // a tap fires mouseenter/focus right before click; don't let that click close the menu it just opened
    if (this.openMenu === name && Date.now() - this.menuOpenedAt < 400) return;
    if (this.openMenu === name) {
      this.openMenu = null;
      this.dismissedMenu = name;
    } else {
      this.dismissedMenu = null;
      this.openMenu = name;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.openMenu) {
      const name = this.openMenu;
      this.doc.getElementById('nav-trigger-' + name)?.focus();
      this.openMenu = null;
      this.dismissedMenu = name;
      return;
    }
    this.closeMobileDrawer();
    this.closeSearch();
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.openSearch();
    }
  }
}
