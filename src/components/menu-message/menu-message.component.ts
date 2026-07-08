import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Action { label: string; onClick: () => void; }
type MessageType = 'info' | 'success' | 'warning' | 'error';

const TYPE_COLORS: Record<MessageType, { border: string; bg: string }> = {
  info:    { border: 'rgba(0,200,255,.25)', bg: 'rgba(0,200,255,.05)' },
  success: { border: 'rgba(72,220,130,.25)', bg: 'rgba(72,220,130,.05)' },
  warning: { border: 'rgba(255,180,60,.25)', bg: 'rgba(255,180,60,.05)' },
  error:   { border: 'rgba(255,80,80,.25)', bg: 'rgba(255,80,80,.05)' },
};

@Component({
  selector: 'app-menu-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (visible()) {
      <div class="mm-shell" [style.border]="'1px solid ' + colors().border" [style.background]="colors().bg">
        <div class="mm-header">
          <span class="mm-icon">{{ icon }}</span>
          <span class="mm-title">{{ title }}</span>
          @if (badge) { <span class="mm-badge">{{ badge }}</span> }
          <button class="mm-close" (click)="dismiss()" aria-label="Dismiss">✕</button>
        </div>
        <div class="mm-body">
          @if (message) { <p class="mm-msg">{{ message }}</p> }
          @if (actions.length > 0) {
            <div class="mm-actions">
              @for (a of actions; track $index; let i = $index) {
                <button [class]="i === 0 ? 'mm-btn' : 'mm-btn-ghost'" (click)="a.onClick()">{{ a.label }}</button>
              }
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [`
    .mm-shell { font-family: 'Rajdhani', sans-serif; border-radius: 12px; overflow: hidden; }
    .mm-header { padding: 14px 18px; background: rgba(0,200,255,.07); border-bottom: 1px solid rgba(0,200,255,.12); display: flex; align-items: center; gap: 12px; }
    .mm-icon { font-size: 20px; }
    .mm-title { font-family: 'Orbitron', sans-serif; font-size: 15px; font-weight: 700; color: #fff; flex: 1; }
    .mm-badge { display: inline-block; background: rgba(0,200,255,.12); border: 1px solid rgba(0,200,255,.3); color: #00c8ff; border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: .08em; padding: 3px 12px; text-transform: uppercase; }
    .mm-close { background: none; border: none; color: #7a9bbf; font-size: 18px; cursor: pointer; line-height: 1; }
    .mm-body { padding: 18px; display: flex; flex-direction: column; gap: 12px; }
    .mm-msg { font-size: 14px; color: #a8bfd8; line-height: 1.65; text-align: center; margin: 0; }
    .mm-actions { display: flex; gap: 10px; justify-content: center; margin-top: 4px; }
    .mm-btn { background: linear-gradient(135deg,#00c8ff,#0080ff); border: none; border-radius: 8px; color: #fff; font-family: 'Orbitron', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: .08em; padding: 9px 22px; cursor: pointer; }
    .mm-btn-ghost { background: transparent; border: 1px solid rgba(0,200,255,.3); border-radius: 8px; color: #00c8ff; font-family: 'Orbitron', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: .08em; padding: 9px 22px; cursor: pointer; }
  `],
})
export class MenuMessageComponent {
  @Input() title = 'Notice';
  @Input() message = '';
  @Input() icon = 'ℹ️';
  @Input() type: MessageType = 'info';
  @Input() badge = '';
  @Input() actions: Action[] = [];
  @Output() dismissed = new EventEmitter<void>();

  visible = signal(true);
  colors = signal(TYPE_COLORS.info);

  ngOnChanges() { this.colors.set(TYPE_COLORS[this.type] ?? TYPE_COLORS.info); }

  dismiss() { this.visible.set(false); this.dismissed.emit(); }
}
