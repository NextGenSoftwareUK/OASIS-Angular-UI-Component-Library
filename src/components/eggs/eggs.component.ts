import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Egg { id: string; name: string; rarity: string; hatchProgress: number; hatched: boolean; reward: string }

@Component({
  selector: 'oasis-eggs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="eggs-shell">
      <div class="eggs-header">
        <h2 class="eggs-title">🥚 Eggs</h2>
        <p class="eggs-sub">Hatch eggs to discover rare OASIS companions and rewards.</p>
      </div>
      <div class="eggs-grid">
        @for (e of eggs(); track e.id) {
          <div class="egg-card" [class.egg-card--hatched]="e.hatched">
            <div class="egg-rarity egg-rarity--{{ e.rarity.toLowerCase() }}">{{ e.rarity }}</div>
            <div class="egg-icon">{{ e.hatched ? '🐣' : '🥚' }}</div>
            <div class="egg-name">{{ e.name }}</div>
            @if (!e.hatched) {
              <div class="egg-progress-wrap">
                <div class="egg-progress-bar"><div class="egg-progress-fill" [style.width.%]="e.hatchProgress"></div></div>
                <div class="egg-pct">{{ e.hatchProgress }}%</div>
              </div>
              <button class="egg-btn" (click)="incubate(e)">Incubate</button>
            } @else {
              <div class="egg-reward">✨ {{ e.reward }}</div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .eggs-shell{display:flex;flex-direction:column;gap:20px}
    .eggs-header{text-align:center}
    .eggs-title{font-family:'Orbitron',sans-serif;font-size:20px;color:#fff;margin:0 0 6px}
    .eggs-sub{font-size:13px;color:#7a9bbf;margin:0}
    .eggs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px}
    .egg-card{background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.15);border-radius:12px;padding:18px 14px;display:flex;flex-direction:column;align-items:center;gap:10px;transition:border-color .2s}
    .egg-card:hover{border-color:rgba(0,200,255,.35)}
    .egg-card--hatched{border-color:rgba(255,180,60,.3);background:rgba(255,180,60,.04)}
    .egg-rarity{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-radius:999px;padding:3px 10px;border:1px solid currentColor}
    .egg-rarity--common{color:#7a9bbf;border-color:rgba(122,155,191,.3)}
    .egg-rarity--rare{color:#5ba8ff;border-color:rgba(91,168,255,.3)}
    .egg-rarity--epic{color:#b87fff;border-color:rgba(184,127,255,.3)}
    .egg-rarity--legendary{color:#ffb43c;border-color:rgba(255,180,60,.3)}
    .egg-icon{font-size:40px}
    .egg-name{font-family:'Orbitron',sans-serif;font-size:12px;color:#fff;text-align:center}
    .egg-progress-wrap{width:100%;display:flex;flex-direction:column;gap:4px;align-items:center}
    .egg-progress-bar{width:100%;height:6px;background:rgba(255,255,255,.1);border-radius:999px;overflow:hidden}
    .egg-progress-fill{height:100%;background:linear-gradient(90deg,#00c8ff,#0080ff);border-radius:999px;transition:width .4s}
    .egg-pct{font-size:11px;color:#7a9bbf}
    .egg-btn{width:100%;background:linear-gradient(135deg,#ffb43c,#ff8c00);border:none;border-radius:7px;color:#fff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;letter-spacing:.08em;padding:8px;cursor:pointer;transition:opacity .2s}
    .egg-btn:hover{opacity:.85}
    .egg-reward{font-size:12px;color:#ffb43c;font-weight:600;text-align:center}
  `]
})
export class EggsComponent {
  eggs = signal<Egg[]>([
    { id: '1', name: 'Cosmic Egg', rarity: 'Legendary', hatchProgress: 75, hatched: false, reward: '+500 Karma Companion' },
    { id: '2', name: 'Forest Egg', rarity: 'Common', hatchProgress: 100, hatched: true, reward: 'Woodland Sprite' },
    { id: '3', name: 'Astral Egg', rarity: 'Epic', hatchProgress: 30, hatched: false, reward: '+200 Karma Companion' },
    { id: '4', name: 'Ocean Egg', rarity: 'Rare', hatchProgress: 55, hatched: false, reward: 'Sea Guardian' },
  ]);

  incubate(e: Egg) {
    this.eggs.update(list => list.map(x => {
      if (x.id !== e.id) return x;
      const next = Math.min(100, x.hatchProgress + 25);
      return { ...x, hatchProgress: next, hatched: next >= 100 };
    }));
  }
}
