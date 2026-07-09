import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-view-providers',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vp-shell">
      <div class="vp-header"><span>🌐</span><h2 class="vp-title">View Providers</h2></div>
      <div class="vp-table-wrap">
        <table class="vp-table">
          <thead><tr><th>Provider</th><th>Installed</th><th>Running</th><th>VP Time</th></tr></thead>
          <tbody>
            @for (p of providers(); track p.name) {
              <tr>
                <td>{{ p.name }}</td>
                <td><span class="vp-dot">{{ p.installed ? '✅' : '❌' }}</span></td>
                <td><span class="vp-dot">{{ p.running ? '🟢' : '⚪' }}</span></td>
                <td>{{ p.vpTime }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <div class="vp-footer"><button class="vp-btn" (click)="close.emit()">Close</button></div>
    </div>
  `,
  styles: [`
    .vp-shell{display:flex;flex-direction:column;gap:16px;padding:20px}
    .vp-header{display:flex;align-items:center;gap:10px}
    .vp-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .vp-table-wrap{overflow-x:auto;border:1px solid rgba(0,200,255,.15);border-radius:10px}
    .vp-table{width:100%;border-collapse:collapse;font-size:13px}
    .vp-table th{background:rgba(0,200,255,.08);color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;letter-spacing:.06em;padding:10px 12px;text-align:left;border-bottom:1px solid rgba(0,200,255,.15)}
    .vp-table td{color:#c8dff0;padding:9px 12px;border-bottom:1px solid rgba(255,255,255,.04)}
    .vp-table tr:last-child td{border-bottom:none}
    .vp-footer{display:flex;justify-content:flex-end}
    .vp-btn{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:9px 22px;cursor:pointer}
  `]
})
export class ViewProvidersComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  providers = signal([
    { name: 'Holochain', installed: true, running: true, vpTime: '12ms' },
    { name: 'Ethereum', installed: true, running: true, vpTime: '180ms' },
    { name: 'IPFS', installed: true, running: false, vpTime: 'N/A' },
    { name: 'MongoDB', installed: true, running: true, vpTime: '5ms' },
    { name: 'Neo4j', installed: false, running: false, vpTime: 'N/A' },
    { name: 'SQLite', installed: true, running: true, vpTime: '1ms' },
    { name: 'ThreeFold', installed: false, running: false, vpTime: 'N/A' },
  ]);
}
