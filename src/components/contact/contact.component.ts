import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'oasis-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="ct-shell">
      <div class="ct-header">
        <h2 class="ct-title">Contact Us</h2>
        <p class="ct-sub">Get in touch with the OASIS team.</p>
      </div>
      @if (sent()) {
        <div class="oasis-auth-success">✅ Message sent! We'll be in touch soon.</div>
      } @else {
        @if (error()) { <div class="oasis-auth-error">{{ error() }}</div> }
        <div class="oasis-grid-2">
          <div class="oasis-field"><label class="oasis-label">First Name</label><input class="oasis-input" type="text" [(ngModel)]="firstName" placeholder="John" /></div>
          <div class="oasis-field"><label class="oasis-label">Last Name</label><input class="oasis-input" type="text" [(ngModel)]="lastName" placeholder="Doe" /></div>
        </div>
        <div class="oasis-field"><label class="oasis-label">Email</label><input class="oasis-input" type="email" [(ngModel)]="email" placeholder="name@example.com" /></div>
        <div class="oasis-field"><label class="oasis-label">Subject</label><input class="oasis-input" type="text" [(ngModel)]="subject" placeholder="How can we help?" /></div>
        <div class="oasis-field"><label class="oasis-label">Message</label><textarea class="oasis-input oasis-textarea" [(ngModel)]="message" placeholder="Your message…" rows="4"></textarea></div>
        <button class="oasis-btn" [disabled]="loading()" (click)="submit()">{{ loading() ? 'Sending…' : 'Send Message' }}</button>
      }
    </div>
  `,
  styles: [`
    .ct-shell{display:flex;flex-direction:column;gap:18px}
    .ct-header{text-align:center}
    .ct-title{font-family:'Orbitron',sans-serif;font-size:20px;color:#fff;margin:0 0 6px}
    .ct-sub{font-size:13px;color:#7a9bbf;margin:0}
    .oasis-auth-error{background:rgba(255,80,80,.12);border:1px solid rgba(255,80,80,.3);color:#ff6b6b;border-radius:8px;padding:10px 14px;font-size:13px}
    .oasis-auth-success{background:rgba(72,220,130,.12);border:1px solid rgba(72,220,130,.3);color:#48dc82;border-radius:8px;padding:10px 14px;font-size:13px}
    .oasis-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
    .oasis-field{display:flex;flex-direction:column;gap:6px}
    .oasis-label{font-size:12px;font-weight:600;letter-spacing:.06em;color:#7a9bbf;text-transform:uppercase}
    .oasis-input{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(0,200,255,.2);border-radius:8px;padding:10px 14px;color:#fff;font-size:14px;outline:none;box-sizing:border-box;transition:border-color .2s;font-family:inherit}
    .oasis-input:focus{border-color:rgba(0,200,255,.5)}
    .oasis-textarea{resize:vertical;min-height:100px}
    .oasis-btn{background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;letter-spacing:.08em;padding:12px;cursor:pointer;transition:opacity .2s}
    .oasis-btn:disabled{opacity:.5;cursor:not-allowed}
  `]
})
export class ContactComponent {
  firstName = ''; lastName = ''; email = ''; subject = ''; message = '';
  loading = signal(false); error = signal(''); sent = signal(false);

  async submit() {
    if (!this.email || !this.message) { this.error.set('Please fill in your email and message.'); return; }
    this.loading.set(true); this.error.set('');
    try {
      await fetch(`https://formsubmit.co/ajax/davidellams@hotmail.com`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ firstName: this.firstName, lastName: this.lastName, email: this.email, subject: this.subject, message: this.message })
      });
      this.sent.set(true);
    } catch (e: any) {
      this.error.set(e?.message ?? 'Send failed. Please try again.');
    } finally { this.loading.set(false); }
  }
}
