import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [style.border-color]="borderColor">
      <div class="card-icon" *ngIf="icon">{{ icon }}</div>
      <div class="card-kicker" *ngIf="kicker" [style.color]="accentColor">{{ kicker }}</div>
      <h3 class="card-title" *ngIf="title">{{ title }}</h3>
      <ng-content />
    </div>
  `,
  styles: [`
    .card { background: var(--bg-card, #0e1f44); border: 1px solid rgba(232,121,249,.15); border-radius: 16px; padding: 32px 26px; height: 100%; box-sizing: border-box; transition: transform .3s, border-color .3s; }
    .card:hover { transform: translateY(-4px); }
    .card-icon { font-size: 36px; margin-bottom: 16px; }
    .card-kicker { font-family: 'Orbitron', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: .12em; margin-bottom: 10px; }
    .card-title { font-family: 'Orbitron', sans-serif; font-size: 15px; font-weight: 700; color: #fff; letter-spacing: .06em; margin: 0 0 12px; }
  `]
})
export class OasisCardComponent {
  @Input() icon = '';
  @Input() kicker = '';
  @Input() title = '';
  @Input() borderColor = 'rgba(232,121,249,.15)';
  @Input() accentColor = '#e879f9';
}
