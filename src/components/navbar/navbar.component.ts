import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarConnectComponent } from '../avatar-connect/avatar-connect.component';

@Component({
  selector: 'oasis-navbar',
  standalone: true,
  imports: [CommonModule, AvatarConnectComponent],
  template: `
    <nav class="nav" [class.scrolled]="scrolled()">
      <a class="nav-brand" href="#">
        <span class="brand-icon">✦</span>
        <span>GLOBAL <em>HEALING</em> NETWORK</span>
      </a>
      <button class="nav-toggle" [class.open]="menuOpen()" (click)="toggleMenu()" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links" [class.open]="menuOpen()">
        <li><a href="#mission" (click)="menuOpen.set(false)">Mission</a></li>
        <li><a href="#pillars" (click)="menuOpen.set(false)">Pillars</a></li>
        <li><a href="#live-beams" (click)="menuOpen.set(false)">Live Beams</a></li>
        <li><a href="#submit-beam" (click)="menuOpen.set(false)">Submit Beam</a></li>
        <li><a href="#groups" (click)="menuOpen.set(false)">Groups</a></li>
        <li><a href="#archive" (click)="menuOpen.set(false)">Archive</a></li>
        <li><a href="#forum" (click)="menuOpen.set(false)">Forum</a></li>
        <li><a href="#healers" (click)="menuOpen.set(false)">Healers</a></li>
        <li><a href="#map" (click)="menuOpen.set(false)">Map</a></li>
        <li><a href="#ecosystem" (click)="menuOpen.set(false)">Ecosystem</a></li>
      </ul>
      <div class="nav-right">
        <oasis-avatar-connect />
      </div>
    </nav>
  `,
  styles: [`
    .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 18px 40px; display: flex; align-items: center; justify-content: space-between; background: rgba(3,7,20,.88); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(232,121,249,.1); transition: padding .3s; }
    .nav.scrolled { padding: 12px 40px; }
    .nav-brand { font-family: 'Orbitron', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: .18em; color: #fff; text-decoration: none; display: flex; align-items: center; gap: 10px; white-space: nowrap; }
    .nav-brand .brand-icon { color: #e879f9; font-size: 16px; }
    .nav-brand em { color: #e879f9; font-style: normal; }
    .nav-links { display: flex; gap: 16px; list-style: none; margin: 0; padding: 0; }
    .nav-links a { font-family: 'Share Tech Mono', monospace; font-size: 11px; letter-spacing: .08em; color: #a8bfd8; text-decoration: none; transition: color .2s; text-transform: uppercase; }
    .nav-links a:hover { color: #e879f9; }
    .nav-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
    .nav-toggle { display: none; flex-direction: column; justify-content: center; gap: 5px; width: 32px; height: 32px; background: none; border: none; cursor: pointer; }
    .nav-toggle span { display: block; width: 100%; height: 2px; background: #a8bfd8; transition: transform .25s, opacity .25s; }
    .nav-toggle.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .nav-toggle.open span:nth-child(2) { opacity: 0; }
    .nav-toggle.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    @media (max-width: 1100px) {
      .nav-toggle { display: flex; }
      .nav-links { position: fixed; top: 0; right: 0; height: 100vh; width: min(78vw,320px); flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 14px; padding: 76px 32px 24px; overflow-y: auto; background: rgba(3,7,20,.97); backdrop-filter: blur(12px); border-left: 1px solid rgba(232,121,249,.12); transform: translateX(100%); transition: transform .3s ease; }
      .nav-links.open { transform: translateX(0); }
      .nav { padding: 14px 20px; }
    }
  `],
  host: { '(window:scroll)': 'onScroll()' }
})
export class NavbarComponent {
  menuOpen = signal(false);
  scrolled = signal(false);
  toggleMenu() { this.menuOpen.set(!this.menuOpen()); }
  onScroll() { this.scrolled.set(window.scrollY > 40); }
}
