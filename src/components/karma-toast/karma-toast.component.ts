import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OasisService } from '../../services/oasis.service';

@Component({
  selector: 'oasis-karma-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (toast()) {
      <div class="karma-toast">
        <span class="kt-amount">+{{ toast()!.amount }} ✦</span>
        <span class="kt-msg">{{ toast()!.message }}</span>
      </div>
    }
  `,
  styles: [`
    .karma-toast {
      position: fixed; bottom: 32px; right: 32px; z-index: 9999;
      background: linear-gradient(135deg, rgba(232,121,249,.15), rgba(168,85,247,.1));
      border: 1px solid rgba(232,121,249,.4); border-radius: 14px;
      padding: 16px 24px; display: flex; flex-direction: column; gap: 4px;
      backdrop-filter: blur(12px);
      animation: slideIn .35s ease;
    }
    .kt-amount { font-family: 'Orbitron', sans-serif; font-size: 22px; font-weight: 900; color: #e879f9; }
    .kt-msg { font-family: 'Share Tech Mono', monospace; font-size: 11px; letter-spacing: .1em; color: #a8bfd8; }
    @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  `]
})
export class KarmaToastComponent {
  toast = inject(OasisService).karmaToast;
}
