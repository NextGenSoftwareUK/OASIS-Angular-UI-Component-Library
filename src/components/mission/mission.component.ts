import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Mission { id: string; title: string; description: string; reward: number; status: 'available' | 'active' | 'complete' }

@Component({
  selector: 'oasis-mission',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mis-shell">
      <div class="mis-header"><h2 class="mis-title">🎯 Missions</h2><p class="mis-sub">Complete missions to earn karma and unlock rewards.</p></div>
      <div class="mis-list">
        @for (m of missions(); track m.id) {
          <div class="mis-card mis-card--{{ m.status }}">
            <div class="mis-left">
              <div class="mis-title-text">{{ m.title }}</div>
              <div class="mis-desc">{{ m.description }}</div>
            </div>
            <div class="mis-right">
              <div class="mis-reward">+{{ m.reward }} karma</div>
              <div class="mis-status-badge mis-status-badge--{{ m.status }}">{{ statusLabel(m.status) }}</div>
              @if (m.status === 'available') { <button class="mis-btn" (click)="accept(m)">Accept</button> }
              @if (m.status === 'active') { <button class="mis-btn mis-btn--complete" (click)="complete(m)">Complete</button> }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .mis-shell{display:flex;flex-direction:column;gap:18px}
    .mis-header{text-align:center}
    .mis-title{font-family:'Orbitron',sans-serif;font-size:20px;color:#fff;margin:0 0 6px}
    .mis-sub{font-size:13px;color:#7a9bbf;margin:0}
    .mis-list{display:flex;flex-direction:column;gap:12px}
    .mis-card{display:flex;align-items:center;gap:16px;background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.12);border-radius:12px;padding:16px}
    .mis-card--active{border-color:rgba(0,200,255,.35);background:rgba(0,200,255,.05)}
    .mis-card--complete{border-color:rgba(72,220,130,.25);background:rgba(72,220,130,.04);opacity:.7}
    .mis-left{flex:1}
    .mis-title-text{font-family:'Orbitron',sans-serif;font-size:13px;color:#fff;margin-bottom:4px}
    .mis-desc{font-size:12px;color:#7a9bbf;line-height:1.5}
    .mis-right{display:flex;flex-direction:column;align-items:flex-end;gap:8px;flex-shrink:0}
    .mis-reward{font-size:12px;color:#48dc82;font-weight:600;white-space:nowrap}
    .mis-status-badge{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;border-radius:999px;padding:3px 10px;border:1px solid currentColor}
    .mis-status-badge--available{color:#7a9bbf;border-color:rgba(122,155,191,.3)}
    .mis-status-badge--active{color:#00c8ff;border-color:rgba(0,200,255,.35)}
    .mis-status-badge--complete{color:#48dc82;border-color:rgba(72,220,130,.3)}
    .mis-btn{background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:7px;color:#fff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;letter-spacing:.08em;padding:7px 16px;cursor:pointer;transition:opacity .2s;white-space:nowrap}
    .mis-btn--complete{background:linear-gradient(135deg,#48dc82,#00aa55)}
  `]
})
export class MissionComponent {
  missions = signal<Mission[]>([
    { id: '1', title: 'First Contact', description: 'Log into OASIS for the first time and explore the hub.', reward: 100, status: 'complete' },
    { id: '2', title: 'Karma Cultivator', description: 'Earn 500 karma through positive actions in the OASIS.', reward: 250, status: 'active' },
    { id: '3', title: 'NFT Hunter', description: 'Acquire your first rare NFT from the marketplace.', reward: 400, status: 'available' },
    { id: '4', title: 'Seed Planter', description: 'Plant 3 seeds and nurture them to full growth.', reward: 150, status: 'available' },
  ]);
  statusLabel(s: string) { return s === 'available' ? 'Available' : s === 'active' ? 'In Progress' : 'Complete'; }
  accept(m: Mission) { this.missions.update(l => l.map(x => x.id === m.id ? { ...x, status: 'active' } : x)); }
  complete(m: Mission) { this.missions.update(l => l.map(x => x.id === m.id ? { ...x, status: 'complete' } : x)); }
}
