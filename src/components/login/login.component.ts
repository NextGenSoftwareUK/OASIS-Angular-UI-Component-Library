import { Component, signal, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OasisService } from '../../services/oasis.service';

@Component({
  selector: 'oasis-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="oasis-auth-form">
      <div class="oasis-auth-header">
        <h2 class="oasis-auth-title">Beam In</h2>
        <p class="oasis-auth-sub">Don't have an account? <a class="oasis-link" (click)="switchTo.emit('signup')" href="javascript:void(0)">Sign Up</a></p>
      </div>

      @if (error()) {
        <div class="oasis-auth-error">{{ error() }}</div>
      }

      <div class="oasis-field">
        <label class="oasis-label" for="oasis-login-username">Username</label>
        <input class="oasis-input" id="oasis-login-username" type="text" [(ngModel)]="username" placeholder="yourusername" autocomplete="username" required />
      </div>

      <div class="oasis-field">
        <label class="oasis-label" for="oasis-login-password">Password</label>
        <div class="oasis-input-wrap">
          <input class="oasis-input" id="oasis-login-password" [type]="showPwd ? 'text' : 'password'" [(ngModel)]="password" placeholder="••••••••" autocomplete="current-password" required />
          <button class="oasis-pwd-toggle" type="button" (click)="showPwd = !showPwd" [attr.aria-label]="showPwd ? 'Hide password' : 'Show password'">
            {{ showPwd ? '🙈' : '👁️' }}
          </button>
        </div>
        <a class="oasis-link oasis-link--small" (click)="switchTo.emit('forgot')" href="javascript:void(0)">Forgot Password?</a>
      </div>

      <div class="oasis-field oasis-field--row">
        <input class="oasis-checkbox" id="oasis-remember" type="checkbox" [(ngModel)]="rememberMe" />
        <label class="oasis-label oasis-label--inline" for="oasis-remember">Remember Me</label>
      </div>

      <button class="oasis-btn" type="button" [disabled]="loading()" (click)="submit()">
        {{ loading() ? 'Connecting…' : 'Beam In' }}
      </button>
    </div>
  `,
  styles: [`
    .oasis-auth-form { display:flex; flex-direction:column; gap:20px; }
    .oasis-auth-header { text-align:center; }
    .oasis-auth-title { font-family:'Orbitron',sans-serif; font-size:22px; color:#fff; margin:0 0 6px; }
    .oasis-auth-sub { font-size:13px; color:#7a9bbf; margin:0; }
    .oasis-auth-error { background:rgba(255,80,80,.12); border:1px solid rgba(255,80,80,.3); color:#ff6b6b; border-radius:8px; padding:10px 14px; font-size:13px; }
    .oasis-field { display:flex; flex-direction:column; gap:6px; }
    .oasis-field--row { flex-direction:row; align-items:center; gap:10px; }
    .oasis-label { font-size:12px; font-weight:600; letter-spacing:.06em; color:#7a9bbf; text-transform:uppercase; }
    .oasis-label--inline { text-transform:none; font-size:13px; color:#a8bfd8; }
    .oasis-input-wrap { position:relative; }
    .oasis-input { width:100%; background:rgba(255,255,255,.05); border:1px solid rgba(0,200,255,.2); border-radius:8px; padding:10px 14px; color:#fff; font-size:14px; outline:none; box-sizing:border-box; transition:border-color .2s; }
    .oasis-input:focus { border-color:rgba(0,200,255,.5); }
    .oasis-input-wrap .oasis-input { padding-right:44px; }
    .oasis-pwd-toggle { position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; font-size:16px; padding:0; line-height:1; }
    .oasis-checkbox { width:16px; height:16px; accent-color:#00c8ff; cursor:pointer; flex-shrink:0; }
    .oasis-link { color:#00c8ff; text-decoration:none; cursor:pointer; }
    .oasis-link--small { font-size:12px; margin-top:2px; }
    .oasis-btn { background:linear-gradient(135deg,#00c8ff,#0080ff); border:none; border-radius:8px; color:#fff; font-family:'Orbitron',sans-serif; font-size:13px; font-weight:700; letter-spacing:.08em; padding:12px; cursor:pointer; transition:opacity .2s; }
    .oasis-btn:disabled { opacity:.5; cursor:not-allowed; }
  `]
})
export class LoginComponent {
  @Output() switchTo = new EventEmitter<'signup' | 'forgot'>();
  @Output() loggedIn = new EventEmitter<void>();

  private oasis = inject(OasisService);

  username = '';
  password = '';
  rememberMe = false;
  showPwd = false;
  loading = signal(false);
  error = signal('');

  async submit() {
    if (!this.username || !this.password) { this.error.set('Please fill in all fields.'); return; }
    this.loading.set(true);
    this.error.set('');
    try {
      await this.oasis.login(this.username, this.password);
      this.loggedIn.emit();
    } catch (e: any) {
      this.error.set(e?.message ?? 'Login failed. Please check your credentials.');
    } finally {
      this.loading.set(false);
    }
  }
}
