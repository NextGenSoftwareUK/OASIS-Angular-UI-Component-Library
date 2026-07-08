import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OasisService } from '../../services/oasis.service';

@Component({
  selector: 'oasis-avatar-connect',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (session()) {
      <div class="avatar-badge">
        <span class="avatar-icon">⬡</span>
        <span class="avatar-name">{{ session()!.username }}</span>
        <span class="karma-pill">{{ session()!.karma | number }} ✦</span>
        <button class="logout-btn" (click)="oasis.logout()">✕</button>
      </div>
    } @else {
      <button class="connect-btn" (click)="open = true">⬡ CONNECT AVATAR</button>
    }

    @if (open) {
      <div class="modal-backdrop" (click)="open = false">
        <div class="modal-box" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="open = false">✕</button>
          <div class="modal-icon">⬡</div>
          <h2 class="modal-title">Connect Your Avatar</h2>
          <p class="modal-sub">Sign in to your OASIS avatar to earn karma and participate in Global Healing Network.</p>
          <input [(ngModel)]="username" placeholder="Avatar username" class="oasis-input" />
          <input [(ngModel)]="password" type="password" placeholder="Password" class="oasis-input" />
          @if (error) { <p class="error-msg">{{ error }}</p> }
          <button class="btn-primary" [disabled]="loading" (click)="login()">
            {{ loading ? 'Connecting…' : 'Connect Avatar' }}
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    .connect-btn { background: none; border: 1px solid rgba(232,121,249,.4); border-radius: 999px; padding: 8px 18px; color: #e879f9; font-family: 'Share Tech Mono', monospace; font-size: 11px; letter-spacing: .1em; cursor: pointer; transition: background .2s; }
    .connect-btn:hover { background: rgba(232,121,249,.08); }
    .avatar-badge { display: flex; align-items: center; gap: 8px; }
    .avatar-icon { color: #e879f9; font-size: 16px; }
    .avatar-name { font-family: 'Share Tech Mono', monospace; font-size: 12px; color: #fff; letter-spacing: .06em; }
    .karma-pill { background: rgba(232,121,249,.12); border: 1px solid rgba(232,121,249,.3); border-radius: 999px; padding: 2px 10px; font-family: 'Share Tech Mono', monospace; font-size: 11px; color: #e879f9; }
    .logout-btn { background: none; border: none; color: #a8bfd8; cursor: pointer; font-size: 14px; margin-left: 4px; }
    .modal-backdrop { position: fixed; inset: 0; z-index: 9000; background: rgba(3,7,20,.85); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 20px; }
    .modal-box { background: #0a1535; border: 1px solid rgba(232,121,249,.25); border-radius: 20px; padding: 40px 36px; max-width: 440px; width: 100%; position: relative; }
    .modal-close { position: absolute; top: 16px; right: 18px; background: none; border: none; color: #a8bfd8; font-size: 20px; cursor: pointer; }
    .modal-icon { font-size: 40px; text-align: center; color: #e879f9; margin-bottom: 16px; }
    .modal-title { font-family: 'Orbitron', sans-serif; font-size: 20px; font-weight: 700; color: #fff; text-align: center; margin: 0 0 8px; }
    .modal-sub { font-size: 14px; color: #a8bfd8; text-align: center; margin: 0 0 24px; line-height: 1.6; }
    .oasis-input { width: 100%; background: rgba(255,255,255,.05); border: 1px solid rgba(232,121,249,.2); border-radius: 8px; padding: 11px 14px; color: #fff; font-size: 14px; outline: none; box-sizing: border-box; margin-bottom: 12px; display: block; }
    .btn-primary { width: 100%; padding: 14px; background: linear-gradient(135deg, #e879f9, #a855f7); border: none; border-radius: 10px; color: #fff; font-family: 'Orbitron', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: .08em; cursor: pointer; margin-top: 4px; }
    .btn-primary:disabled { opacity: .5; cursor: not-allowed; }
    .error-msg { color: #f87171; font-size: 13px; text-align: center; margin-bottom: 8px; }
  `]
})
export class AvatarConnectComponent {
  oasis = inject(OasisService);
  session = this.oasis.session;
  open = false;
  loading = false;
  error = '';
  username = '';
  password = '';

  async login(): Promise<void> {
    if (!this.username || !this.password) { this.error = 'Please fill in both fields.'; return; }
    this.loading = true; this.error = '';
    try {
      await this.oasis.login(this.username, this.password);
      this.open = false; this.username = ''; this.password = '';
    } catch {
      this.error = 'Login failed. Please check your credentials.';
    } finally { this.loading = false; }
  }
}
