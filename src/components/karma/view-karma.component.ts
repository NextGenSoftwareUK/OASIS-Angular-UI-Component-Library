import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-view-karma',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vk-shell">
      <div class="vk-header"><span>✨</span><h2 class="vk-title">View Karma</h2></div>
      <div class="vk-table-wrap">
        <table class="vk-table">
          <thead><tr><th>Avatar</th><th>Karma</th><th>Level</th><th>Rank</th></tr></thead>
          <tbody>
            @for (k of karmaList(); track k.avatar) {
              <tr><td>{{ k.avatar }}</td><td>{{ k.karma }}</td><td>{{ k.level }}</td><td>#{{ k.rank }}</td></tr>
            }
          </tbody>
        </table>
      </div>
      <div class="vk-footer"><button class="vk-btn" (click)="close.emit()">Close</button></div>
    </div>
  `,
  styles: [`
    .vk-shell{display:flex;flex-direction:column;gap:16px;padding:20px}
    .vk-header{display:flex;align-items:center;gap:10px}
    .vk-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .vk-table-wrap{overflow-x:auto;border:1px solid rgba(0,200,255,.15);border-radius:10px}
    .vk-table{width:100%;border-collapse:collapse;font-size:13px}
    .vk-table th{background:rgba(0,200,255,.08);color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;letter-spacing:.06em;padding:10px 12px;text-align:left;border-bottom:1px solid rgba(0,200,255,.15)}
    .vk-table td{color:#c8dff0;padding:9px 12px;border-bottom:1px solid rgba(255,255,255,.04)}
    .vk-table tr:last-child td{border-bottom:none}
    .vk-footer{display:flex;justify-content:flex-end}
    .vk-btn{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:9px 22px;cursor:pointer}
  `]
})
export class ViewKarmaComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  karmaList = signal([
    { avatar: 'CosmicSage', karma: 1500, level: 20, rank: 1 },
    { avatar: 'StarWalker', karma: 840, level: 12, rank: 2 },
    { avatar: 'NebulaDancer', karma: 420, level: 7, rank: 3 },
    { avatar: 'VoidWatcher', karma: 210, level: 4, rank: 4 },
  ]);
}
