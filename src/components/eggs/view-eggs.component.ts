import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-view-eggs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ve-shell">
      <div class="ve-header"><span>🥚</span><h2 class="ve-title">View Eggs</h2></div>
      <div class="ve-grid">
        @for (e of eggs(); track e.name) {
          <div class="ve-card" [class.ve-card--hatched]="e.hatched">
            <div class="ve-rarity ve-rarity--{{ e.rarity.toLowerCase() }}">{{ e.rarity }}</div>
            <div class="ve-emoji">{{ e.hatched ? '🐣' : '🥚' }}</div>
            <div class="ve-name">{{ e.name }}</div>
            <div class="ve-pct">{{ e.progress }}%</div>
          </div>
        }
      </div>
      <div class="ve-footer"><button class="ve-btn" (click)="close.emit()">Close</button></div>
    </div>
  `,
  styles: [`
    .ve-shell{display:flex;flex-direction:column;gap:16px;padding:20px}
    .ve-header{display:flex;align-items:center;gap:10px}
    .ve-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .ve-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:12px}
    .ve-card{background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.15);border-radius:10px;padding:14px;display:flex;flex-direction:column;align-items:center;gap:8px}
    .ve-card--hatched{border-color:rgba(255,180,60,.3);background:rgba(255,180,60,.04)}
    .ve-rarity{font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-radius:999px;padding:2px 8px;border:1px solid currentColor}
    .ve-rarity--common{color:#7a9bbf}.ve-rarity--rare{color:#5ba8ff}.ve-rarity--epic{color:#b87fff}.ve-rarity--legendary{color:#ffb43c}
    .ve-emoji{font-size:32px}
    .ve-name{font-family:'Orbitron',sans-serif;font-size:11px;color:#fff;text-align:center}
    .ve-pct{font-size:11px;color:#7a9bbf}
    .ve-footer{display:flex;justify-content:flex-end}
    .ve-btn{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:9px 22px;cursor:pointer}
  `]
})
export class ViewEggsComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  eggs = signal([
    { name: 'Cosmic Egg', rarity: 'Legendary', progress: 75, hatched: false },
    { name: 'Forest Egg', rarity: 'Common', progress: 100, hatched: true },
    { name: 'Astral Egg', rarity: 'Epic', progress: 30, hatched: false },
    { name: 'Ocean Egg', rarity: 'Rare', progress: 55, hatched: false },
  ]);
}
