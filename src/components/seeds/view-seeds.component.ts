import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-view-seeds',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vs-shell">
      <div class="vs-header"><span>🌱</span><h2 class="vs-title">View Seeds</h2></div>
      <div class="vs-summary">
        <div class="vs-stat"><div class="vs-stat-val">2,222</div><div class="vs-stat-lbl">Your Seeds</div></div>
        <div class="vs-stat"><div class="vs-stat-val">777</div><div class="vs-stat-lbl">Karma</div></div>
      </div>
      <div class="vs-section">
        <h3 class="vs-section-title">Seeds Sent</h3>
        <div class="vs-table-wrap">
          <table class="vs-table">
            <thead><tr><th>Date</th><th>To Avatar</th><th>Amount</th><th>Type</th><th>Karma Earnt</th></tr></thead>
            <tbody>
              @for (tx of sent(); track tx.date) {
                <tr><td>{{ tx.date }}</td><td>{{ tx.to }}</td><td>{{ tx.amount }}</td><td>{{ tx.type }}</td><td>+{{ tx.karma }}</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
      <div class="vs-section">
        <h3 class="vs-section-title">Seeds Received</h3>
        <div class="vs-table-wrap">
          <table class="vs-table">
            <thead><tr><th>Date</th><th>From Avatar</th><th>Amount</th><th>Type</th><th>Karma Earnt</th></tr></thead>
            <tbody>
              @for (tx of received(); track tx.date) {
                <tr><td>{{ tx.date }}</td><td>{{ tx.from }}</td><td>{{ tx.amount }}</td><td>{{ tx.type }}</td><td>+{{ tx.karma }}</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
      <div class="vs-actions">
        <button class="vs-action-btn" (click)="close.emit()">Pay with Seeds</button>
        <button class="vs-action-btn" (click)="close.emit()">Donate with Seeds</button>
        <button class="vs-action-btn" (click)="close.emit()">Reward with Seeds</button>
      </div>
    </div>
  `,
  styles: [`
    .vs-shell{display:flex;flex-direction:column;gap:16px;padding:20px}
    .vs-header{display:flex;align-items:center;gap:10px}
    .vs-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .vs-summary{display:flex;gap:16px}
    .vs-stat{flex:1;background:rgba(0,200,255,.06);border:1px solid rgba(0,200,255,.15);border-radius:10px;padding:14px;text-align:center}
    .vs-stat-val{font-family:'Orbitron',sans-serif;font-size:24px;font-weight:700;color:#00c8ff}
    .vs-stat-lbl{font-size:11px;color:#7a9bbf;margin-top:4px;text-transform:uppercase;letter-spacing:.06em}
    .vs-section{display:flex;flex-direction:column;gap:8px}
    .vs-section-title{font-family:'Orbitron',sans-serif;font-size:13px;color:#fff;margin:0}
    .vs-table-wrap{overflow-x:auto;border:1px solid rgba(0,200,255,.1);border-radius:8px}
    .vs-table{width:100%;border-collapse:collapse;font-size:12px}
    .vs-table th{background:rgba(0,200,255,.06);color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:9px;font-weight:700;letter-spacing:.06em;padding:8px 10px;text-align:left;border-bottom:1px solid rgba(0,200,255,.1)}
    .vs-table td{color:#c8dff0;padding:7px 10px;border-bottom:1px solid rgba(255,255,255,.04)}
    .vs-table tr:last-child td{border-bottom:none}
    .vs-actions{display:flex;gap:10px;flex-wrap:wrap}
    .vs-action-btn{flex:1;background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:10px;cursor:pointer;white-space:nowrap}
  `]
})
export class ViewSeedsComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  sent = signal([
    { date:'2026-07-01', to:'StarWalker', amount:'50', type:'Gift', karma:5 },
    { date:'2026-06-28', to:'NebulaDancer', amount:'100', type:'Reward', karma:10 },
  ]);
  received = signal([
    { date:'2026-07-02', from:'CosmicSage', amount:'25', type:'Gift', karma:3 },
    { date:'2026-06-30', from:'VoidWatcher', amount:'200', type:'Quest', karma:20 },
  ]);
}
