import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-view-leagues',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lg-shell">
      <div class="lg-header"><span>🏅</span><h2 class="lg-title">Leagues</h2></div>
      <div class="lg-table-wrap">
        <table class="lg-table">
          <thead><tr><th>Rank</th><th>League</th><th>Members</th><th>Season Points</th><th>Status</th></tr></thead>
          <tbody>
            @for (l of leagues(); track l.rank) {
              <tr><td>{{ l.rank }}</td><td>{{ l.name }}</td><td>{{ l.members }}</td><td>{{ l.points }}</td><td><span class="lg-status lg-status--{{ l.status.toLowerCase() }}">{{ l.status }}</span></td></tr>
            }
          </tbody>
        </table>
      </div>
      <div class="lg-footer"><button class="lg-btn" (click)="close.emit()">Close</button></div>
    </div>
  `,
  styles: [`
    .lg-shell{display:flex;flex-direction:column;gap:16px;padding:20px}
    .lg-header{display:flex;align-items:center;gap:10px}
    .lg-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .lg-table-wrap{overflow-x:auto;border:1px solid rgba(0,200,255,.15);border-radius:10px}
    .lg-table{width:100%;border-collapse:collapse;font-size:13px}
    .lg-table th{background:rgba(0,200,255,.08);color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;letter-spacing:.06em;padding:10px 12px;text-align:left;border-bottom:1px solid rgba(0,200,255,.15)}
    .lg-table td{color:#c8dff0;padding:9px 12px;border-bottom:1px solid rgba(255,255,255,.04)}
    .lg-status{border-radius:999px;padding:2px 9px;font-size:10px;font-weight:700}
    .lg-status--active{background:rgba(0,200,100,.15);color:#00c864;border:1px solid rgba(0,200,100,.3)}
    .lg-status--closed{background:rgba(122,155,191,.1);color:#7a9bbf;border:1px solid rgba(122,155,191,.25)}
    .lg-footer{display:flex;justify-content:flex-end}
    .lg-btn{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:9px 22px;cursor:pointer}
  `]
})
export class ViewLeaguesComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  leagues = signal([
    { rank:1, name:'Platinum League', members:128, points:9800, status:'Active' },
    { rank:2, name:'Gold League', members:256, points:6500, status:'Active' },
    { rank:3, name:'Silver League', members:512, points:3200, status:'Active' },
    { rank:4, name:'Bronze League', members:1024, points:1100, status:'Closed' },
  ]);
}
