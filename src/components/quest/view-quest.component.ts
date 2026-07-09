import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-view-quest',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vq-shell">
      <div class="vq-header"><span>⚔️</span><h2 class="vq-title">View Quests</h2></div>
      <div class="vq-list">
        @for (q of quests(); track q.id) {
          <div class="vq-card">
            <div class="vq-difficulty vq-difficulty--{{ q.difficulty.toLowerCase() }}">{{ q.difficulty }}</div>
            <div class="vq-name">{{ q.name }}</div>
            <div class="vq-desc">{{ q.description }}</div>
            <div class="vq-meta"><span>Reward: {{ q.reward }}</span><span>Level {{ q.level }}+</span></div>
          </div>
        }
      </div>
      <div class="vq-footer"><button class="vq-btn" (click)="close.emit()">Close</button></div>
    </div>
  `,
  styles: [`
    .vq-shell{display:flex;flex-direction:column;gap:16px;padding:20px}
    .vq-header{display:flex;align-items:center;gap:10px}
    .vq-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .vq-list{display:flex;flex-direction:column;gap:10px}
    .vq-card{background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.12);border-radius:10px;padding:14px 16px;display:flex;flex-direction:column;gap:8px}
    .vq-difficulty{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;border-radius:999px;padding:2px 10px;align-self:flex-start;border:1px solid currentColor}
    .vq-difficulty--easy{color:#00c864;border-color:rgba(0,200,100,.3)}
    .vq-difficulty--medium{color:#ffb43c;border-color:rgba(255,180,60,.3)}
    .vq-difficulty--hard{color:#ff5050;border-color:rgba(255,80,80,.3)}
    .vq-name{font-family:'Orbitron',sans-serif;font-size:13px;color:#fff}
    .vq-desc{font-size:12px;color:#a8bfd8;line-height:1.5}
    .vq-meta{display:flex;gap:16px;font-size:11px;color:#7a9bbf}
    .vq-footer{display:flex;justify-content:flex-end}
    .vq-btn{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:9px 22px;cursor:pointer}
  `]
})
export class ViewQuestComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  quests = signal([
    { id:1, name:'The Lost Artifact', description:'Recover the ancient artifact from the Crystal Caves.', difficulty:'Hard', reward:'500 SEEDS + 200 XP', level:10 },
    { id:2, name:'Merchant Escort', description:'Safely escort the merchant caravan through the danger zone.', difficulty:'Medium', reward:'150 SEEDS + 75 XP', level:5 },
    { id:3, name:'Herb Gathering', description:'Collect 10 moonblossoms from the Enchanted Forest.', difficulty:'Easy', reward:'25 SEEDS + 20 XP', level:1 },
  ]);
}
