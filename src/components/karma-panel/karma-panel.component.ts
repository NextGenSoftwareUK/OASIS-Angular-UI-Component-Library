import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OasisService } from '../../services/oasis.service';

type Tab = 'records' | 'stats' | 'weightings';

@Component({
  selector: 'oasis-karma-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="kp-shell">
      <div class="kp-banner">
        <div class="kp-stat">
          <div class="kp-stat-label">KARMA</div>
          <div class="kp-stat-value">{{ oasis.session()?.karma ?? '—' }}</div>
        </div>
        <div class="kp-stat">
          <div class="kp-stat-label">LEVEL</div>
          <div class="kp-stat-value kp-stat-value--level">{{ level() }}</div>
        </div>
        <div class="kp-stat">
          <div class="kp-stat-label">AVATAR TYPE</div>
          <div class="kp-stat-value kp-stat-value--type">User</div>
        </div>
      </div>

      <div class="kp-tabs">
        <button class="kp-tab" [class.kp-tab--active]="activeTab() === 'records'" (click)="activeTab.set('records')">Akashic Records</button>
        <button class="kp-tab" [class.kp-tab--active]="activeTab() === 'stats'" (click)="activeTab.set('stats')">Stats</button>
        <button class="kp-tab" [class.kp-tab--active]="activeTab() === 'weightings'" (click)="activeTab.set('weightings')">Weightings</button>
      </div>

      @if (activeTab() === 'records') {
        <div class="kp-panel kp-empty">
          <div class="kp-empty-icon">📜</div>
          <p>No karma records found.<br>Complete actions in the OASIS ecosystem to build your Akashic Record.</p>
        </div>
      }
      @if (activeTab() === 'stats') {
        <div class="kp-panel kp-empty">
          <div class="kp-empty-icon">📊</div>
          <p>No stats available yet.</p>
        </div>
      }
      @if (activeTab() === 'weightings') {
        <div class="kp-panel">
          <div class="kp-vote-banner">
            <div>
              <strong>Karma Voting</strong>
              <p>Community voting to adjust karma weightings is coming soon.</p>
            </div>
            <button class="kp-btn-ghost">Vote on Weightings <span class="kp-soon">Coming Soon</span></button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .kp-shell { color:#fff; display:flex; flex-direction:column; gap:20px; }
    .kp-banner { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
    .kp-stat { background:rgba(0,200,255,.06); border:1px solid rgba(0,200,255,.12); border-radius:10px; padding:14px; text-align:center; }
    .kp-stat-label { font-size:10px; font-weight:700; letter-spacing:.1em; color:#7a9bbf; text-transform:uppercase; margin-bottom:6px; }
    .kp-stat-value { font-family:'Orbitron',sans-serif; font-size:22px; color:#00c8ff; }
    .kp-stat-value--level { color:#a78bfa; }
    .kp-stat-value--type { color:#48dc82; font-size:16px; }
    .kp-tabs { display:flex; gap:4px; border-bottom:1px solid rgba(0,200,255,.12); }
    .kp-tab { background:none; border:none; color:#7a9bbf; font-size:13px; padding:10px 16px; cursor:pointer; border-bottom:2px solid transparent; transition:all .2s; }
    .kp-tab--active { color:#00c8ff; border-bottom-color:#00c8ff; }
    .kp-panel { padding:16px 0; }
    .kp-empty { display:flex; flex-direction:column; align-items:center; gap:10px; padding:40px 16px; text-align:center; color:#7a9bbf; font-size:13px; line-height:1.6; }
    .kp-empty-icon { font-size:32px; }
    .kp-vote-banner { display:flex; align-items:center; justify-content:space-between; gap:16px; background:rgba(255,255,255,.03); border:1px solid rgba(0,200,255,.1); border-radius:10px; padding:16px; font-size:13px; color:#a8bfd8; line-height:1.5; }
    .kp-vote-banner strong { display:block; color:#fff; margin-bottom:4px; }
    .kp-btn-ghost { flex-shrink:0; background:transparent; border:1px solid rgba(0,200,255,.3); color:#00c8ff; border-radius:6px; padding:8px 14px; font-size:12px; cursor:pointer; white-space:nowrap; }
    .kp-soon { display:inline-block; background:rgba(255,180,60,.15); color:#ffb43c; border-radius:999px; font-size:9px; padding:2px 6px; margin-left:6px; letter-spacing:.06em; vertical-align:middle; }
  `]
})
export class KarmaPanelComponent {
  oasis = inject(OasisService);
  activeTab = signal<Tab>('records');

  level() {
    const k = this.oasis.session()?.karma ?? 0;
    return Math.floor(Math.sqrt(k / 100)) + 1;
  }
}
