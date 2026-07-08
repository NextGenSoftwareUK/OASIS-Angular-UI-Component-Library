import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface OApp { id: string; name: string; description: string; category: string; icon: string; karma: number; launched: boolean }

@Component({
  selector: 'oasis-oapp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="oapp-shell">
      <div class="oapp-header"><h2 class="oapp-title">📱 OApps</h2><p class="oapp-sub">Decentralised apps built on the OASIS network.</p></div>
      <div class="oapp-search-wrap"><input class="oasis-input" type="text" [(ngModel)]="search" placeholder="Search OApps…" /></div>
      <div class="oapp-grid">
        @for (a of filtered(); track a.id) {
          <div class="oapp-card">
            <div class="oapp-icon">{{ a.icon }}</div>
            <div class="oapp-info">
              <div class="oapp-name">{{ a.name }}</div>
              <div class="oapp-cat">{{ a.category }}</div>
              <div class="oapp-desc">{{ a.description }}</div>
            </div>
            <div class="oapp-footer">
              <div class="oapp-karma">+{{ a.karma }} karma</div>
              <button class="oapp-btn" [class.oapp-btn--launched]="a.launched" (click)="toggle(a)">{{ a.launched ? 'Quit' : 'Launch' }}</button>
            </div>
          </div>
        }
        @if (filtered().length === 0) { <div class="oapp-empty">No OApps found.</div> }
      </div>
    </div>
  `,
  styles: [`
    .oapp-shell{display:flex;flex-direction:column;gap:18px}
    .oapp-header{text-align:center}
    .oapp-title{font-family:'Orbitron',sans-serif;font-size:20px;color:#fff;margin:0 0 6px}
    .oapp-sub{font-size:13px;color:#7a9bbf;margin:0}
    .oapp-search-wrap{}
    .oasis-input{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(0,200,255,.2);border-radius:8px;padding:10px 14px;color:#fff;font-size:14px;outline:none;box-sizing:border-box;transition:border-color .2s;font-family:inherit}
    .oasis-input:focus{border-color:rgba(0,200,255,.5)}
    .oapp-grid{display:flex;flex-direction:column;gap:12px}
    .oapp-card{background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.12);border-radius:12px;padding:16px;display:flex;gap:14px;align-items:flex-start;transition:border-color .2s}
    .oapp-card:hover{border-color:rgba(0,200,255,.3)}
    .oapp-icon{font-size:32px;flex-shrink:0}
    .oapp-info{flex:1}
    .oapp-name{font-family:'Orbitron',sans-serif;font-size:13px;color:#fff;margin-bottom:3px}
    .oapp-cat{font-size:11px;color:#5ba8ff;text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px}
    .oapp-desc{font-size:12px;color:#7a9bbf;line-height:1.5}
    .oapp-footer{display:flex;flex-direction:column;align-items:flex-end;gap:8px;flex-shrink:0}
    .oapp-karma{font-size:11px;color:#48dc82;font-weight:600;white-space:nowrap}
    .oapp-btn{background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:7px;color:#fff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;letter-spacing:.08em;padding:7px 16px;cursor:pointer;transition:opacity .2s;white-space:nowrap}
    .oapp-btn--launched{background:rgba(255,80,80,.2);border:1px solid rgba(255,80,80,.4);color:#ff6b6b}
    .oapp-empty{text-align:center;color:#4a6a88;font-size:14px;padding:32px}
  `]
})
export class OAppComponent {
  search = '';
  oapps = signal<OApp[]>([
    { id: '1', name: 'OLAND', description: 'Virtual land management and terraforming in the OASIS.', category: 'Metaverse', icon: '🌍', karma: 200, launched: false },
    { id: '2', name: 'OMARKET', description: 'Decentralised marketplace for NFTs and digital goods.', category: 'Commerce', icon: '🛒', karma: 150, launched: false },
    { id: '3', name: 'OCHAT', description: 'Encrypted peer-to-peer messaging on the ONET.', category: 'Social', icon: '💬', karma: 80, launched: false },
    { id: '4', name: 'OQUESTS', description: 'Daily quests and challenges for karma rewards.', category: 'Gaming', icon: '⚔️', karma: 300, launched: false },
  ]);
  filtered() {
    const q = this.search.toLowerCase();
    return this.oapps().filter(a => a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q));
  }
  toggle(a: OApp) { this.oapps.update(list => list.map(x => x.id === a.id ? { ...x, launched: !x.launched } : x)); }
}
