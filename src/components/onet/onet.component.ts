import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-onet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="onet-shell">
      <div class="onet-header"><h2 class="onet-title">🌐 ONET</h2><p class="onet-sub">The OASIS decentralised internet layer.</p></div>
      <div class="onet-status-card" [class.onet-status--active]="connected()">
        <div class="onet-status-dot" [class.onet-status-dot--active]="connected()"></div>
        <div class="onet-status-info">
          <div class="onet-status-label">ONET Connection</div>
          <div class="onet-status-val">{{ connected() ? 'Connected' : 'Disconnected' }}</div>
        </div>
        <button class="onet-btn" (click)="connected.set(!connected())">{{ connected() ? 'Disconnect' : 'Connect' }}</button>
      </div>
      @if (connected()) {
        <div class="onet-stats">
          @for (s of stats; track s.label) {
            <div class="onet-stat"><div class="onet-stat-val">{{ s.value }}</div><div class="onet-stat-label">{{ s.label }}</div></div>
          }
        </div>
        <div class="onet-peers-header">Active Peers</div>
        <div class="onet-peers">
          @for (p of peers; track p.id) {
            <div class="onet-peer">
              <div class="onet-peer-icon">👤</div>
              <div class="onet-peer-info"><div class="onet-peer-name">{{ p.name }}</div><div class="onet-peer-location">{{ p.location }}</div></div>
              <div class="onet-peer-ping">{{ p.ping }}ms</div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .onet-shell{display:flex;flex-direction:column;gap:18px}
    .onet-header{text-align:center}
    .onet-title{font-family:'Orbitron',sans-serif;font-size:20px;color:#fff;margin:0 0 6px}
    .onet-sub{font-size:13px;color:#7a9bbf;margin:0}
    .onet-status-card{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.12);border-radius:12px;padding:16px}
    .onet-status--active{border-color:rgba(72,220,130,.3)}
    .onet-status-dot{width:12px;height:12px;border-radius:50%;background:#4a6a88;flex-shrink:0;transition:all .3s}
    .onet-status-dot--active{background:#48dc82;box-shadow:0 0 10px #48dc82}
    .onet-status-info{flex:1}
    .onet-status-label{font-size:12px;color:#7a9bbf;text-transform:uppercase;letter-spacing:.06em}
    .onet-status-val{font-family:'Orbitron',sans-serif;font-size:14px;color:#fff;margin-top:3px}
    .onet-btn{background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;padding:9px 18px;cursor:pointer}
    .onet-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
    .onet-stat{background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.1);border-radius:10px;padding:14px;text-align:center}
    .onet-stat-val{font-family:'Share Tech Mono',monospace;font-size:18px;color:#00c8ff;font-weight:600}
    .onet-stat-label{font-size:11px;color:#7a9bbf;margin-top:4px;text-transform:uppercase;letter-spacing:.06em}
    .onet-peers-header{font-family:'Orbitron',sans-serif;font-size:12px;color:#7a9bbf;letter-spacing:.06em;text-transform:uppercase}
    .onet-peers{display:flex;flex-direction:column;gap:8px}
    .onet-peer{display:flex;align-items:center;gap:12px;padding:10px 14px;background:rgba(255,255,255,.03);border:1px solid rgba(0,200,255,.07);border-radius:8px}
    .onet-peer-icon{font-size:20px}
    .onet-peer-info{flex:1}
    .onet-peer-name{font-size:13px;color:#e0f0ff}
    .onet-peer-location{font-size:11px;color:#4a6a88;margin-top:2px}
    .onet-peer-ping{font-family:'Share Tech Mono',monospace;font-size:12px;color:#48dc82}
  `]
})
export class OnetComponent {
  connected = signal(false);
  stats = [
    { label: 'Peers', value: '2,847' },
    { label: 'Speed', value: '1.2 Gb/s' },
    { label: 'Encrypted', value: '100%' },
  ];
  peers = [
    { id: '1', name: 'AvatarX_7291', location: 'New York, US', ping: 14 },
    { id: '2', name: 'StarKeeper_99', location: 'London, UK', ping: 32 },
    { id: '3', name: 'NeonRider_404', location: 'Tokyo, JP', ping: 67 },
  ];
}
