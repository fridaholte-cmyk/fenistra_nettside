import { Component, ElementRef, OnDestroy, afterNextRender, inject, signal } from '@angular/core';

/**
 * Integration ecosystem: Fenistra in the middle, connected systems around it. When the diagram scrolls
 * into view the connections draw out, small data pulses travel along them and the logos pop in one by one.
 * Only systems listed on the Integrasjoner page are shown.
 */
/** iconOnly: the logo is a symbol without the name, so the name is written next to it */
type Node = { name: string; logo?: string; h?: number; iconOnly?: boolean; x: number; y: number };

const SYSTEMS: Omit<Node, 'x' | 'y'>[] = [
  { name: 'Visma Business NXT', logo: 'images/integrasjoner/business-nxt.svg', h: 20 },
  { name: 'Tripletex', logo: 'images/integrasjoner/tripletex.svg', h: 24 },
  { name: 'Properly' }, // no logo file yet: shown as its name
  { name: 'Xledger', logo: 'images/integrasjoner/xledger.svg', h: 24 },
  { name: 'Visma.net', logo: 'images/integrasjoner/visma-net.svg', h: 22 },
  { name: 'PowerOffice GO', logo: 'images/integrasjoner/poweroffice.svg', h: 16 },
  { name: 'Power BI', logo: 'images/integrasjoner/powerbi.svg', h: 24, iconOnly: true },
];

@Component({
  selector: 'app-ecosystem',
  standalone: true,
  templateUrl: './ecosystem.component.html',
  styleUrl: './ecosystem.component.scss',
})
export class EcosystemComponent implements OnDestroy {
  /** positions in the 600×600 diagram, on a circle around the centre */
  nodes: Node[] = SYSTEMS.map((s, i) => {
    const a = -Math.PI / 2 + (i / SYSTEMS.length) * Math.PI * 2;
    return { ...s, x: Math.round(300 + Math.cos(a) * 225), y: Math.round(300 + Math.sin(a) * 225) };
  });
  /** faint "network" links between neighbouring systems */
  links = this.nodes.map((n, i) => ({ a: n, b: this.nodes[(i + 1) % this.nodes.length] }));
  /** small dots scattered around for the network feel (fixed, so the server and browser render the same) */
  dots = [[96, 140], [520, 120], [560, 360], [470, 560], [140, 520], [40, 330], [300, 40], [300, 560], [210, 210], [400, 400], [420, 190], [180, 410]];
  shown = signal(false);
  private io?: IntersectionObserver;

  constructor() {
    const host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    afterNextRender(() => {
      if (!('IntersectionObserver' in window)) { this.shown.set(true); return; }
      this.io = new IntersectionObserver((es) => {
        if (es.some((e) => e.isIntersecting)) { this.shown.set(true); this.io?.disconnect(); }
      }, { threshold: 0.3 });
      this.io.observe(host);
    });
  }

  path(n: Node) {
    return `M300,300 L${n.x},${n.y}`;
  }

  ngOnDestroy() {
    this.io?.disconnect();
  }
}
