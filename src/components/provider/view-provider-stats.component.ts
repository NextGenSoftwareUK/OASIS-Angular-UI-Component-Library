import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-view-provider-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vps-shell">
      <div class="vps-header"><span>📊</span><h2 class="vps-title">Provider Stats</h2></div>
      <div class="vps-grid">
        @for (stat of stats(); track stat.label) {
          <div class="vps-card">
            <div class="vps-card-icon">{{ stat.icon }}</div>
            <div class="vps-card-val">{{ stat.value }}</div>
            <div class="vps-card-lbl">{{ stat.label }}</div>
          </div>
        }
      </div>
      <div class="vps-list">
        @for (p of providerStats(); track p.name) {
          <div class="vps-row"><span class="vps-pname">{{ p.name }}</span><span class="vps-puptime">{{ p.uptime }}% uptime</span><span class="vps-pspeed">{{ p.speed }}ms</span></div>
        }
      </div>
      <div class="vps-footer"><button class="vps-btn" (click)="close.emit()">Close</button></div>
    </div>
  `,
  styles: [`
    .vps-shell{display:flex;flex-direction:column;gap:16px;padding:20px}
    .vps-header{display:flex;align-items:center;gap:10px}
    .vps-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .vps-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:10px}
    .vps-card{background:rgba(0,200,255,.06);border:1px solid rgba(0,200,255,.15);border-radius:10px;padding:14px;text-align:center;display:flex;flex-direction:column;gap:6px}
    .vps-card-icon{font-size:24px}
    .vps-card-val{font-family:'Orbitron',sans-serif;font-size:18px;font-weight:700;color:#00c8ff}
    .vps-card-lbl{font-size:10px;color:#7a9bbf;text-transform:uppercase;letter-spacing:.06em}
    .vps-list{display:flex;flex-direction:column;gap:6px}
    .vps-row{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.05);border-radius:8px;padding:8px 12px;font-size:12px}
    .vps-pname{flex:1;color:#c8dff0}
    .vps-puptime{color:#00c864;font-weight:600}
    .vps-pspeed{color:#7a9bbf;width:50px;text-align:right}
    .vps-footer{display:flex;justify-content:flex-end}
    .vps-btn{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:9px 22px;cursor:pointer}
  `]
})
export class ViewProviderStatsComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  stats = signal([
    { icon:'🌐', label:'Active Providers', value:'4' },
    { icon:'⚡', label:'Avg Speed', value:'55ms' },
    { icon:'📈', label:'Uptime', value:'99.2%' },
    { icon:'🔄', label:'Sync Count', value:'1,248' },
  ]);
  providerStats = signal([
    { name:'Holochain', uptime:99.9, speed:12 },
    { name:'Ethereum', uptime:99.5, speed:180 },
    { name:'MongoDB', uptime:99.8, speed:5 },
    { name:'SQLite', uptime:100, speed:1 },
  ]);
}
