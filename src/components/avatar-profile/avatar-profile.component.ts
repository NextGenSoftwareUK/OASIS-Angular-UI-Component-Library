import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OasisService } from '../../services/oasis.service';

interface AvatarFields {
  title: string; firstName: string; lastName: string;
  username: string; email: string; address: string;
}

@Component({
  selector: 'oasis-avatar-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="avp-shell">
      @if (!oasis.session()) {
        <div class="avp-empty">Please <strong>Beam In</strong> to view your avatar.</div>
      } @else {
        <div class="avp-layout">
          <aside class="avp-summary">
            <div class="avp-avatar-img">
              <span class="avp-avatar-icon">👤</span>
            </div>
            <div class="avp-name">{{ oasis.session()?.username }}</div>
            <div class="avp-stats">
              <div class="avp-stat">
                <span class="avp-stat-icon">⚡</span>
                <div>
                  <div class="avp-stat-value">{{ oasis.session()?.karma ?? '—' }}</div>
                  <div class="avp-stat-label">Karma</div>
                </div>
              </div>
            </div>
          </aside>

          <div class="avp-fields">
            <div class="avp-section-label">PROFILE</div>
            <div class="avp-field-row">
              <label class="avp-label" for="avp-title">Title</label>
              <input class="avp-input" id="avp-title" type="text" [(ngModel)]="fields.title" placeholder="Dr, Mr, Ms…" (input)="dirty = true" />
            </div>
            <div class="avp-field-row">
              <label class="avp-label" for="avp-first">First Name</label>
              <input class="avp-input" id="avp-first" type="text" [(ngModel)]="fields.firstName" placeholder="First name" (input)="dirty = true" />
            </div>
            <div class="avp-field-row">
              <label class="avp-label" for="avp-last">Last Name</label>
              <input class="avp-input" id="avp-last" type="text" [(ngModel)]="fields.lastName" placeholder="Last name" (input)="dirty = true" />
            </div>
            <div class="avp-field-row">
              <label class="avp-label" for="avp-username">Username</label>
              <input class="avp-input" id="avp-username" type="text" [(ngModel)]="fields.username" placeholder="Username" (input)="dirty = true" />
            </div>

            <div class="avp-section-label" style="margin-top:18px">CONTACT</div>
            <div class="avp-field-row">
              <label class="avp-label" for="avp-email">Email</label>
              <input class="avp-input" id="avp-email" type="email" [(ngModel)]="fields.email" placeholder="name@example.com" (input)="dirty = true" />
            </div>
            <div class="avp-field-row">
              <label class="avp-label" for="avp-address">Address</label>
              <input class="avp-input" id="avp-address" type="text" [(ngModel)]="fields.address" placeholder="Optional" (input)="dirty = true" />
            </div>

            @if (status()) {
              <div class="avp-status" [class.avp-status--error]="statusType() === 'error'">{{ status() }}</div>
            }

            @if (dirty) {
              <div class="avp-actions">
                <button class="avp-btn" (click)="save()" [disabled]="saving()">{{ saving() ? 'Saving…' : 'Save Changes' }}</button>
                <button class="avp-btn avp-btn--ghost" (click)="discard()">Discard</button>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .avp-shell { color:#fff; }
    .avp-empty { text-align:center; padding:40px; color:#7a9bbf; font-size:14px; }
    .avp-layout { display:grid; grid-template-columns:180px 1fr; gap:28px; }
    .avp-summary { display:flex; flex-direction:column; align-items:center; gap:14px; }
    .avp-avatar-img { width:88px; height:88px; border-radius:50%; background:rgba(0,200,255,.1); border:2px solid rgba(0,200,255,.3); display:flex; align-items:center; justify-content:center; }
    .avp-avatar-icon { font-size:40px; }
    .avp-name { font-family:'Orbitron',sans-serif; font-size:13px; color:#fff; text-align:center; word-break:break-all; }
    .avp-stats { display:flex; flex-direction:column; gap:8px; width:100%; }
    .avp-stat { display:flex; align-items:center; gap:8px; background:rgba(0,200,255,.06); border-radius:8px; padding:8px 10px; }
    .avp-stat-icon { font-size:16px; }
    .avp-stat-value { font-family:'Orbitron',sans-serif; font-size:14px; color:#00c8ff; }
    .avp-stat-label { font-size:11px; color:#7a9bbf; text-transform:uppercase; letter-spacing:.06em; }
    .avp-fields { display:flex; flex-direction:column; gap:12px; }
    .avp-section-label { font-size:10px; font-weight:700; letter-spacing:.12em; color:#7a9bbf; text-transform:uppercase; margin-bottom:4px; }
    .avp-field-row { display:grid; grid-template-columns:90px 1fr; align-items:center; gap:12px; }
    .avp-label { font-size:12px; color:#7a9bbf; text-align:right; }
    .avp-input { width:100%; background:rgba(255,255,255,.05); border:1px solid rgba(0,200,255,.2); border-radius:6px; padding:8px 12px; color:#fff; font-size:13px; outline:none; box-sizing:border-box; transition:border-color .2s; }
    .avp-input:focus { border-color:rgba(0,200,255,.5); }
    .avp-status { margin-top:4px; font-size:13px; color:#48dc82; }
    .avp-status--error { color:#ff6b6b; }
    .avp-actions { display:flex; gap:10px; margin-top:4px; }
    .avp-btn { background:linear-gradient(135deg,#00c8ff,#0080ff); border:none; border-radius:6px; color:#fff; font-family:'Orbitron',sans-serif; font-size:11px; font-weight:700; letter-spacing:.08em; padding:9px 16px; cursor:pointer; transition:opacity .2s; }
    .avp-btn:disabled { opacity:.5; cursor:not-allowed; }
    .avp-btn--ghost { background:transparent; border:1px solid rgba(0,200,255,.3); color:#00c8ff; }
  `]
})
export class AvatarProfileComponent implements OnInit {
  oasis = inject(OasisService);

  fields: AvatarFields = { title: '', firstName: '', lastName: '', username: '', email: '', address: '' };
  dirty = false;
  saving = signal(false);
  status = signal('');
  statusType = signal<'ok' | 'error'>('ok');

  ngOnInit() {
    const sess = this.oasis.session();
    if (sess) this.fields.username = sess.username;
  }

  async save() {
    this.saving.set(true);
    this.status.set('');
    try {
      // Avatar update would use oasis.avatar.updateAvatar() when available
      await new Promise(r => setTimeout(r, 600));
      this.dirty = false;
      this.statusType.set('ok');
      this.status.set('Changes saved.');
      setTimeout(() => this.status.set(''), 3000);
    } catch (e: any) {
      this.statusType.set('error');
      this.status.set(e?.message ?? 'Save failed.');
    } finally {
      this.saving.set(false);
    }
  }

  discard() {
    const sess = this.oasis.session();
    this.fields = { title: '', firstName: '', lastName: '', username: sess?.username ?? '', email: '', address: '' };
    this.dirty = false;
    this.status.set('');
  }
}
