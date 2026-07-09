import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-view-tournaments',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tn-shell">
      <div class="tn-header"><span>⚔️</span><h2 class="tn-title">Tournaments</h2></div>
      <div class="tn-list">
        @for (t of tournaments(); track t.id) {
          <div class="tn-card">
            <div class="tn-status tn-status--{{ t.status.toLowerCase() }}">{{ t.status }}</div>
            <div class="tn-name">{{ t.name }}</div>
            <div class="tn-meta">{{ t.participants }} participants · Prize: {{ t.prize }}</div>
            <div class="tn-date">{{ t.date }}</div>
          </div>
        }
      </div>
      <div class="tn-footer"><button class="tn-btn" (click)="close.emit()">Close</button></div>
    </div>
  `,
  styles: [`
    .tn-shell{display:flex;flex-direction:column;gap:16px;padding:20px}
    .tn-header{display:flex;align-items:center;gap:10px}
    .tn-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .tn-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px}
    .tn-card{background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.15);border-radius:10px;padding:16px;display:flex;flex-direction:column;gap:8px}
    .tn-status{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;border-radius:999px;padding:2px 10px;align-self:flex-start;border:1px solid currentColor}
    .tn-status--open{color:#00c864;border-color:rgba(0,200,100,.3)}
    .tn-status--upcoming{color:#5ba8ff;border-color:rgba(91,168,255,.3)}
    .tn-status--closed{color:#7a9bbf;border-color:rgba(122,155,191,.25)}
    .tn-name{font-family:'Orbitron',sans-serif;font-size:13px;color:#fff}
    .tn-meta{font-size:12px;color:#7a9bbf}
    .tn-date{font-size:11px;color:#5ba8ff}
    .tn-footer{display:flex;justify-content:flex-end}
    .tn-btn{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:9px 22px;cursor:pointer}
  `]
})
export class ViewTournamentsComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  tournaments = signal([
    { id:1, name:'Galactic Cup 2026', participants:64, prize:'500 SEEDS', status:'Open', date:'2026-07-15' },
    { id:2, name:'Neon Arena Finals', participants:32, prize:'1 ETH', status:'Upcoming', date:'2026-08-01' },
    { id:3, name:'Star Wars Classic', participants:128, prize:'200 SEEDS', status:'Closed', date:'2026-06-01' },
  ]);
}
