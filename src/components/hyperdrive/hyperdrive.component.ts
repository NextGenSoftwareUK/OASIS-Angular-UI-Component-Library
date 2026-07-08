import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-hyperdrive',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="hd-shell">
      <div class="hd-header"><h2 class="hd-title">🚀 HyperDrive</h2><p class="hd-sub">Quantum-speed data layer for the OASIS Omniverse.</p></div>
      <div class="hd-status-card" [class.hd-status-card--active]="active()">
        <div class="hd-status-icon">{{ active() ? '⚡' : '💤' }}</div>
        <div class="hd-status-info">
          <div class="hd-status-label">HyperDrive Status</div>
          <div class="hd-status-val" [class.hd-status-val--on]="active()">{{ active() ? 'ACTIVE' : 'OFFLINE' }}</div>
        </div>
        <button class="hd-toggle-btn" [class.hd-toggle-btn--on]="active()" (click)="active.set(!active())">{{ active() ? 'Disengage' : 'Engage' }}</button>
      </div>
      @if (active()) {
        <div class="hd-metrics">
          @for (m of metrics; track m.label) {
            <div class="hd-metric-card">
              <div class="hd-metric-val">{{ m.value }}</div>
              <div class="hd-metric-label">{{ m.label }}</div>
            </div>
          }
        </div>
        <div class="hd-nodes">
          <div class="hd-nodes-header">Connected Nodes</div>
          @for (n of nodes; track n.id) {
            <div class="hd-node">
              <div class="hd-node-dot hd-node-dot--{{ n.status }}"></div>
              <div class="hd-node-name">{{ n.name }}</div>
              <div class="hd-node-latency">{{ n.latency }}ms</div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .hd-shell{display:flex;flex-direction:column;gap:18px}
    .hd-header{text-align:center}
    .hd-title{font-family:'Orbitron',sans-serif;font-size:20px;color:#fff;margin:0 0 6px}
    .hd-sub{font-size:13px;color:#7a9bbf;margin:0}
    .hd-status-card{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.12);border-radius:12px;padding:16px;transition:border-color .2s}
    .hd-status-card--active{border-color:rgba(0,200,255,.4);background:rgba(0,200,255,.05)}
    .hd-status-icon{font-size:28px}
    .hd-status-info{flex:1}
    .hd-status-label{font-size:12px;color:#7a9bbf;text-transform:uppercase;letter-spacing:.06em}
    .hd-status-val{font-family:'Orbitron',sans-serif;font-size:16px;color:#7a9bbf;margin-top:2px}
    .hd-status-val--on{color:#00c8ff}
    .hd-toggle-btn{background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;padding:10px 20px;cursor:pointer;transition:opacity .2s}
    .hd-toggle-btn--on{background:rgba(255,80,80,.2);border:1px solid rgba(255,80,80,.35);color:#ff6b6b}
    .hd-metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
    .hd-metric-card{background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.1);border-radius:10px;padding:14px;text-align:center}
    .hd-metric-val{font-family:'Share Tech Mono',monospace;font-size:20px;color:#00c8ff;font-weight:600}
    .hd-metric-label{font-size:11px;color:#7a9bbf;margin-top:4px;text-transform:uppercase;letter-spacing:.06em}
    .hd-nodes{display:flex;flex-direction:column;gap:8px}
    .hd-nodes-header{font-family:'Orbitron',sans-serif;font-size:12px;color:#7a9bbf;letter-spacing:.06em;text-transform:uppercase}
    .hd-node{display:flex;align-items:center;gap:10px;padding:10px 14px;background:rgba(255,255,255,.03);border:1px solid rgba(0,200,255,.07);border-radius:8px}
    .hd-node-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
    .hd-node-dot--active{background:#48dc82;box-shadow:0 0 6px #48dc82}
    .hd-node-dot--idle{background:#7a9bbf}
    .hd-node-name{flex:1;font-size:13px;color:#e0f0ff}
    .hd-node-latency{font-family:'Share Tech Mono',monospace;font-size:12px;color:#7a9bbf}
  `]
})
export class HyperDriveComponent {
  active = signal(false);
  metrics = [
    { label: 'Throughput', value: '4.2 TB/s' },
    { label: 'Latency', value: '0.3ms' },
    { label: 'Uptime', value: '99.98%' },
  ];
  nodes = [
    { id: '1', name: 'ONODE Alpha — US East', status: 'active', latency: 12 },
    { id: '2', name: 'ONODE Beta — EU West', status: 'active', latency: 28 },
    { id: '3', name: 'ONODE Gamma — Asia Pacific', status: 'idle', latency: 55 },
  ];
}
