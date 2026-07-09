import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-view-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="va-shell">
      <div class="va-header"><span>👤</span><h2 class="va-title">View Avatars</h2></div>
      <div class="va-table-wrap">
        <table class="va-table">
          <thead><tr><th>Avatar</th><th>Level</th><th>Karma</th><th>Sex</th><th>Created</th><th>Online</th></tr></thead>
          <tbody>
            @for (a of avatars(); track a.name) {
              <tr>
                <td>{{ a.name }}</td><td>{{ a.level }}</td><td>{{ a.karma }}</td><td>{{ a.sex }}</td><td>{{ a.created }}</td>
                <td><span class="va-dot" [class.va-dot--on]="a.online">{{ a.online ? '🟢' : '⚪' }}</span></td>
              </tr>
            }
          </tbody>
        </table>
      </div>
      <div class="va-footer"><button class="va-btn" (click)="close.emit()">Close</button></div>
    </div>
  `,
  styles: [`
    .va-shell{display:flex;flex-direction:column;gap:16px;padding:20px}
    .va-header{display:flex;align-items:center;gap:10px}
    .va-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .va-table-wrap{overflow-x:auto;border:1px solid rgba(0,200,255,.15);border-radius:10px}
    .va-table{width:100%;border-collapse:collapse;font-size:13px}
    .va-table th{background:rgba(0,200,255,.08);color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;letter-spacing:.06em;padding:10px 12px;text-align:left;border-bottom:1px solid rgba(0,200,255,.15)}
    .va-table td{color:#c8dff0;padding:9px 12px;border-bottom:1px solid rgba(255,255,255,.04)}
    .va-table tr:last-child td{border-bottom:none}
    .va-table tr:hover td{background:rgba(0,200,255,.04)}
    .va-footer{display:flex;justify-content:flex-end}
    .va-btn{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:9px 22px;cursor:pointer}
  `]
})
export class ViewAvatarComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  avatars = signal([
    { name: 'StarWalker', level: 12, karma: 840, sex: 'Male', created: '2024-01-15', online: true },
    { name: 'NebulaDancer', level: 7, karma: 420, sex: 'Female', created: '2024-03-22', online: false },
    { name: 'CosmicSage', level: 20, karma: 1500, sex: 'Male', created: '2023-11-01', online: true },
  ]);
}
