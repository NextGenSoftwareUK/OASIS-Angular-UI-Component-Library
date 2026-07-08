import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Provider { id: string; name: string; icon: string; color: string; type: string; connected: boolean; description: string }

@Component({
  selector: 'oasis-providers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="prov-shell">
      <div class="prov-header"><h2 class="prov-title">🔗 Providers</h2><p class="prov-sub">Connect blockchain providers to your OASIS avatar.</p></div>
      <div class="prov-list">
        @for (p of providers(); track p.id) {
          <div class="prov-card" [class.prov-card--connected]="p.connected">
            <div class="prov-icon" [style.color]="p.color">{{ p.icon }}</div>
            <div class="prov-info">
              <div class="prov-name">{{ p.name }}</div>
              <div class="prov-type">{{ p.type }}</div>
              <div class="prov-desc">{{ p.description }}</div>
            </div>
            <div class="prov-actions">
              <div class="prov-status-dot" [class.prov-status-dot--on]="p.connected"></div>
              <button class="prov-btn" [class.prov-btn--disconnect]="p.connected" (click)="toggle(p)">{{ p.connected ? 'Disconnect' : 'Connect' }}</button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .prov-shell{display:flex;flex-direction:column;gap:18px}
    .prov-header{text-align:center}
    .prov-title{font-family:'Orbitron',sans-serif;font-size:20px;color:#fff;margin:0 0 6px}
    .prov-sub{font-size:13px;color:#7a9bbf;margin:0}
    .prov-list{display:flex;flex-direction:column;gap:10px}
    .prov-card{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.12);border-radius:12px;padding:14px 16px;transition:border-color .2s}
    .prov-card--connected{border-color:rgba(72,220,130,.3);background:rgba(72,220,130,.03)}
    .prov-icon{font-size:26px;flex-shrink:0}
    .prov-info{flex:1}
    .prov-name{font-family:'Orbitron',sans-serif;font-size:13px;color:#fff;margin-bottom:2px}
    .prov-type{font-size:11px;color:#5ba8ff;text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px}
    .prov-desc{font-size:12px;color:#7a9bbf}
    .prov-actions{display:flex;flex-direction:column;align-items:center;gap:8px;flex-shrink:0}
    .prov-status-dot{width:8px;height:8px;border-radius:50%;background:#4a6a88}
    .prov-status-dot--on{background:#48dc82;box-shadow:0 0 6px #48dc82}
    .prov-btn{background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:7px;color:#fff;font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;letter-spacing:.06em;padding:7px 14px;cursor:pointer;white-space:nowrap}
    .prov-btn--disconnect{background:rgba(255,80,80,.15);border:1px solid rgba(255,80,80,.3);color:#ff6b6b}
  `]
})
export class ProvidersComponent {
  providers = signal<Provider[]>([
    { id: '1', name: 'Ethereum', icon: '⟠', color: '#627eea', type: 'Blockchain', description: 'Connect your Ethereum wallet (MetaMask, WalletConnect).', connected: false },
    { id: '2', name: 'Solana', icon: '◎', color: '#9945ff', type: 'Blockchain', description: 'Connect your Solana wallet (Phantom, Solflare).', connected: false },
    { id: '3', name: 'EOSIO', icon: '🔮', color: '#443f54', type: 'Blockchain', description: 'Connect via EOSIO for high-speed transactions.', connected: false },
    { id: '4', name: 'Holochain', icon: '⬡', color: '#00e5be', type: 'P2P Network', description: 'Peer-to-peer data storage on Holochain.', connected: false },
    { id: '5', name: 'The Graph', icon: '📊', color: '#6f4cff', type: 'Indexer', description: 'Query blockchain data with The Graph protocol.', connected: false },
  ]);
  toggle(p: Provider) { this.providers.update(l => l.map(x => x.id === p.id ? { ...x, connected: !x.connected } : x)); }
}
