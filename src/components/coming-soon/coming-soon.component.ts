import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-coming-soon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cs-shell">
      <div class="cs-icon">🚀</div>
      <h2 class="cs-title">{{ title }}</h2>
      <p class="cs-body">{{ message }}</p>
      <div class="cs-badge">Coming Soon</div>
    </div>
  `,
  styles: [`
    .cs-shell{display:flex;flex-direction:column;align-items:center;gap:16px;padding:40px 20px;text-align:center}
    .cs-icon{font-size:48px}
    .cs-title{font-family:'Orbitron',sans-serif;font-size:20px;color:#fff;margin:0}
    .cs-body{font-size:14px;color:#7a9bbf;line-height:1.6;margin:0;max-width:360px}
    .cs-badge{background:rgba(255,180,60,.12);border:1px solid rgba(255,180,60,.28);color:#ffb43c;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:.1em;padding:5px 14px;text-transform:uppercase}
  `]
})
export class ComingSoonComponent {
  @Input() title = 'Feature Coming Soon';
  @Input() message = 'This feature is currently under development and will be available soon.';
}
