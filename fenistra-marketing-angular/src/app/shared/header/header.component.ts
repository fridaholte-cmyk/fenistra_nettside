import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

declare const FENISTRA_SEARCH_INDEX: { title: string; url: string; category: string; desc: string }[];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  scrolled = false;
  mobileDrawerOpen = false;
  searchOpen = false;
  searchQuery = '';
  searchResults: { title: string; url: string; category: string; desc: string }[] = [];

  constructor(private router: Router) {}

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = (window.scrollY || document.documentElement.scrollTop) > 8;
  }

  openMobileDrawer() { this.mobileDrawerOpen = true; }
  closeMobileDrawer() { this.mobileDrawerOpen = false; }

  openSearch() {
    this.searchOpen = true;
    setTimeout(() => document.getElementById('searchInput')?.focus(), 50);
  }
  closeSearch() { this.searchOpen = false; }

  onSearchInput(value: string) {
    this.searchQuery = value;
    const q = value.trim().toLowerCase();
    if (!q || typeof FENISTRA_SEARCH_INDEX === 'undefined') {
      this.searchResults = [];
      return;
    }
    this.searchResults = FENISTRA_SEARCH_INDEX
      .map((item) => {
        const title = item.title.toLowerCase();
        let score = -1;
        if (title === q) score = 4;
        else if (title.startsWith(q)) score = 3;
        else if (title.includes(q)) score = 2;
        else if (item.category.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)) score = 1;
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
    this.mobileDrawerOpen = false;
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
