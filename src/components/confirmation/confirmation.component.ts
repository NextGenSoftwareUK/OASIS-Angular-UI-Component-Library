import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-confirmation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="conf-shell">
      <div class="conf-icon">{{ icon }}</div>
      <h2 class="conf-title">{{ title }}</h2>
      <p class="conf-body">{{ message }}</p>
      <div class="conf-actions">
        <button class="conf-btn conf-btn--confirm" (click)="confirm.emit()">{{ confirmLabel }}</button>
        <button class="conf-btn conf-btn--cancel" (click)="cancel.emit()">{{ cancelLabel }}</button>
      </div>
    </div>
  `,
  styles: [`
    .conf-shell{display:flex;flex-direction:column;align-items:center;gap:18px;padding:20px;text-align:center}
    .conf-icon{font-size:44px}
    .conf-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .conf-body{font-size:14px;color:#a8bfd8;line-height:1.6;margin:0;max-width:360px}
    .conf-actions{display:flex;gap:12px;margin-top:4px}
    .conf-btn{border:none;border-radius:8px;font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;padding:11px 24px;cursor:pointer;transition:opacity .2s}
    .conf-btn--confirm{background:linear-gradient(135deg,#ff4444,#cc0000);color:#fff}
    .conf-btn--cancel{background:transparent;border:1px solid rgba(0,200,255,.3);color:#00c8ff}
  `]
})
export class ConfirmationComponent {
  @Input() title = 'Are you sure?';
  @Input() message = 'This action cannot be undone.';
  @Input() icon = '⚠️';
  @Input() confirmLabel = 'Confirm';
  @Input() cancelLabel = 'Cancel';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
