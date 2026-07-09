import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-view-achievements',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ach-shell">
      <div class="ach-header"><span>🏆</span><h2 class="ach-title">Achievements</h2></div>
      <div class="ach-list">
        @for (a of achievements(); track a.id) {
          <div class="ach-row" [class.ach-row--unlocked]="a.unlocked">
            <div class="ach-badge">{{ a.unlocked ? a.icon : '🔒' }}</div>
            <div class="ach-info"><div class="ach-name">{{ a.name }}</div><div class="ach-desc">{{ a.description }}</div></div>
            <div class="ach-xp">+{{ a.xp }} XP</div>
          </div>
        }
      </div>
      <div class="ach-footer"><button class="ach-btn" (click)="close.emit()">Close</button></div>
    </div>
  `,
  styles: [`
    .ach-shell{display:flex;flex-direction:column;gap:16px;padding:20px}
    .ach-header{display:flex;align-items:center;gap:10px}
    .ach-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .ach-list{display:flex;flex-direction:column;gap:8px}
    .ach-row{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);border-radius:10px;padding:12px 16px;opacity:.5;transition:opacity .2s}
    .ach-row--unlocked{opacity:1;border-color:rgba(0,200,255,.2)}
    .ach-badge{font-size:28px;flex-shrink:0}
    .ach-info{flex:1}
    .ach-name{font-family:'Orbitron',sans-serif;font-size:13px;color:#fff}
    .ach-desc{font-size:12px;color:#7a9bbf;margin-top:2px}
    .ach-xp{font-size:12px;color:#ffb43c;font-weight:700;flex-shrink:0}
    .ach-footer{display:flex;justify-content:flex-end}
    .ach-btn{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:9px 22px;cursor:pointer}
  `]
})
export class ViewAchievementsComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  achievements = signal([
    { id:1, icon:'⚔️', name:'First Quest', description:'Complete your first quest', xp:100, unlocked:true },
    { id:2, icon:'🌟', name:'Star Collector', description:'Collect 100 stars', xp:250, unlocked:true },
    { id:3, icon:'🏛️', name:'Hub Master', description:'Visit all OASIS hubs', xp:500, unlocked:false },
    { id:4, icon:'🐉', name:'Dragon Slayer', description:'Defeat the cosmic dragon', xp:1000, unlocked:false },
  ]);
}
