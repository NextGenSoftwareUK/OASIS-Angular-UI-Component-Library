import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-view-mission',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vm-shell">
      <div class="vm-header"><span>🎯</span><h2 class="vm-title">View Missions</h2></div>
      <div class="vm-list">
        @for (m of missions(); track m.id) {
          <div class="vm-card">
            <div class="vm-status vm-status--{{ m.status.toLowerCase() }}">{{ m.status }}</div>
            <div class="vm-name">{{ m.name }}</div>
            <div class="vm-desc">{{ m.description }}</div>
            <div class="vm-meta"><span>Difficulty: {{ m.difficulty }}</span><span>Reward: {{ m.reward }}</span></div>
          </div>
        }
      </div>
      <div class="vm-footer"><button class="vm-btn" (click)="close.emit()">Close</button></div>
    </div>
  `,
  styles: [`
    .vm-shell{display:flex;flex-direction:column;gap:16px;padding:20px}
    .vm-header{display:flex;align-items:center;gap:10px}
    .vm-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .vm-list{display:flex;flex-direction:column;gap:10px}
    .vm-card{background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.12);border-radius:10px;padding:14px 16px;display:flex;flex-direction:column;gap:8px}
    .vm-status{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;border-radius:999px;padding:2px 10px;align-self:flex-start;border:1px solid currentColor}
    .vm-status--active{color:#00c864;border-color:rgba(0,200,100,.3)}
    .vm-status--completed{color:#5ba8ff;border-color:rgba(91,168,255,.3)}
    .vm-status--upcoming{color:#ffb43c;border-color:rgba(255,180,60,.3)}
    .vm-name{font-family:'Orbitron',sans-serif;font-size:13px;color:#fff}
    .vm-desc{font-size:12px;color:#a8bfd8;line-height:1.5}
    .vm-meta{display:flex;gap:16px;font-size:11px;color:#7a9bbf}
    .vm-footer{display:flex;justify-content:flex-end}
    .vm-btn{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:9px 22px;cursor:pointer}
  `]
})
export class ViewMissionComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  missions = signal([
    { id:1, name:'The Great Convergence', description:'Unite the three factions of the OASIS under one banner.', difficulty:'Hard', reward:'500 SEEDS', status:'Active' },
    { id:2, name:'Data Recovery', description:'Recover lost data fragments scattered across the OASIS.', difficulty:'Medium', reward:'200 SEEDS', status:'Upcoming' },
    { id:3, name:'First Contact', description:'Complete the introductory mission sequence.', difficulty:'Easy', reward:'50 SEEDS', status:'Completed' },
  ]);
}
