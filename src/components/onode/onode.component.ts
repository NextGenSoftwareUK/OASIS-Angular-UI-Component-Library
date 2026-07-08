import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-onode',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="nd-shell">
      <div class="nd-header"><h2 class="nd-title">🖥️ ONODE</h2><p class="nd-sub">Your personal OASIS node. Store, validate, and relay data.</p></div>
      <div class="nd-status-row">
        <div class="nd-status-pill" [class.nd-status-pill--running]="running()">{{ running() ? '● Running' : '○ Stopped' }}</div>
        <button class="nd-btn" [class.nd-btn--stop]="running()" (click)="running.set(!running())">{{ running() ? 'Stop Node' : 'Start Node' }}</button>
      </div>
      @if (running()) {
        <div class="nd-metrics">
          @for (m of metrics; track m.label) {
            <div class="nd-metric"><div class="nd-metric-val">{{ m.value }}</div><div class="nd-metric-label">{{ m.label }}</div></div>
          }
        </div>
        <div class="nd-logs-header">Node Logs</div>
        <div class="nd-logs">
          @for (l of logs; track l.time) {
            <div class="nd-log nd-log--{{ l.level }}">
              <span class="nd-log-time">{{ l.time }}</span>
              <span class="nd-log-level">[{{ l.level.toUpperCase() }}]</span>
              <span class="nd-log-msg">{{ l.message }}</span>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .nd-shell{display:flex;flex-direction:column;gap:18px}
    .nd-header{text-align:center}
    .nd-title{font-family:'Orbitron',sans-serif;font-size:20px;color:#fff;margin:0 0 6px}
    .nd-sub{font-size:13px;color:#7a9bbf;margin:0}
    .nd-status-row{display:flex;align-items:center;gap:14px}
    .nd-status-pill{flex:1;background:rgba(255,255,255,.04);border:1px solid rgba(255,80,80,.2);border-radius:8px;padding:10px 14px;font-family:'Orbitron',sans-serif;font-size:13px;color:#ff6b6b}
    .nd-status-pill--running{border-color:rgba(72,220,130,.3);color:#48dc82}
    .nd-btn{background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;padding:10px 20px;cursor:pointer}
    .nd-btn--stop{background:rgba(255,80,80,.2);border:1px solid rgba(255,80,80,.35);color:#ff6b6b}
    .nd-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
    .nd-metric{background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.1);border-radius:10px;padding:12px;text-align:center}
    .nd-metric-val{font-family:'Share Tech Mono',monospace;font-size:16px;color:#00c8ff;font-weight:600}
    .nd-metric-label{font-size:10px;color:#7a9bbf;margin-top:4px;text-transform:uppercase;letter-spacing:.06em}
    .nd-logs-header{font-family:'Orbitron',sans-serif;font-size:12px;color:#7a9bbf;letter-spacing:.06em;text-transform:uppercase}
    .nd-logs{background:#020a14;border:1px solid rgba(0,200,255,.1);border-radius:8px;padding:12px;display:flex;flex-direction:column;gap:5px;max-height:160px;overflow-y:auto;font-family:'Share Tech Mono',monospace}
    .nd-log{display:flex;gap:10px;font-size:11px}
    .nd-log-time{color:#4a6a88;flex-shrink:0}
    .nd-log--info .nd-log-level{color:#00c8ff}
    .nd-log--warn .nd-log-level{color:#ffb43c}
    .nd-log--error .nd-log-level{color:#ff6b6b}
    .nd-log-msg{color:#7a9bbf}
  `]
})
export class OnodeComponent {
  running = signal(false);
  metrics = [
    { label: 'CPU', value: '18%' },
    { label: 'RAM', value: '2.1 GB' },
    { label: 'Storage', value: '47 GB' },
    { label: 'Blocks', value: '12,450' },
  ];
  logs = [
    { time: '09:42:01', level: 'info', message: 'ONODE started. Connecting to ONET…' },
    { time: '09:42:02', level: 'info', message: 'Connected to 12 peers.' },
    { time: '09:42:05', level: 'info', message: 'Block #12450 validated.' },
    { time: '09:42:08', level: 'warn', message: 'Peer ONODE-77 latency high: 340ms.' },
    { time: '09:42:12', level: 'info', message: 'Data sync complete. 100% coverage.' },
  ];
}
