import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OASISClient } from '@oasisomniverse/web4-api';

@Component({
  selector: 'oasis-verify-email',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="oasis-auth-form">
      <div class="oasis-auth-header">
        <div style="font-size:48px;margin-bottom:12px">📧</div>
        <h2 class="oasis-auth-title">Verify Your Email</h2>
        <p class="oasis-auth-sub">We sent a verification link to your email address. Check your inbox and click the link to activate your account.</p>
      </div>
      @if (error()) { <div class="oasis-auth-error">{{ error() }}</div> }
      @if (sent()) { <div class="oasis-auth-success">✅ Verification email resent!</div> }
      <button class="oasis-btn oasis-btn--ghost" type="button" [disabled]="loading()" (click)="resend()">
        {{ loading() ? 'Sending…' : 'Resend Verification Email' }}
      </button>
    </div>
  `,
  styles: [`
    .oasis-auth-form{display:flex;flex-direction:column;gap:20px;text-align:center}
    .oasis-auth-header{display:flex;flex-direction:column;align-items:center}
    .oasis-auth-title{font-family:'Orbitron',sans-serif;font-size:20px;color:#fff;margin:0 0 8px}
    .oasis-auth-sub{font-size:13px;color:#7a9bbf;margin:0;line-height:1.6;max-width:360px}
    .oasis-auth-error{background:rgba(255,80,80,.12);border:1px solid rgba(255,80,80,.3);color:#ff6b6b;border-radius:8px;padding:10px 14px;font-size:13px}
    .oasis-auth-success{background:rgba(72,220,130,.12);border:1px solid rgba(72,220,130,.3);color:#48dc82;border-radius:8px;padding:10px 14px;font-size:13px}
    .oasis-btn{border:none;border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;letter-spacing:.08em;padding:12px;cursor:pointer;transition:opacity .2s}
    .oasis-btn--ghost{background:transparent;border:1px solid rgba(0,200,255,.3);color:#00c8ff}
    .oasis-btn:disabled{opacity:.5;cursor:not-allowed}
  `]
})
export class VerifyEmailComponent {
  loading = signal(false); error = signal(''); sent = signal(false);

  async resend() {
    this.loading.set(true); this.error.set(''); this.sent.set(false);
    try {
      const oasis = new OASISClient({ baseUrl: 'https://api.web4.oasisomniverse.one' });
      await (oasis.auth as any).resendVerificationEmail();
      this.sent.set(true);
    } catch (e: any) {
      this.error.set(e?.message ?? 'Failed to resend. Please try again.');
    } finally { this.loading.set(false); }
  }
}
