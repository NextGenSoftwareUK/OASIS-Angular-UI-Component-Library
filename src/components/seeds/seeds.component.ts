import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Seed { id: string; name: string; type: string; rarity: string; karma: number; planted: boolean }

@Component({
  selector: 'oasis-seeds',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="seeds-shell">
      <div class="seeds-header">
        <h2 class="seeds-title">🌱 Seeds</h2>
        <p class="seeds-sub">Plant seeds to grow your OASIS avatar and earn karma.</p>
      </div>
      <div class="seeds-grid">
        @for (s of seeds(); track s.id) {
          <div class="seed-card" [class.seed-card--planted]="s.planted">
            <div class="seed-rarity seed-rarity--{{ s.rarity.toLowerCase() }}">{{ s.rarity }}</div>
            <div class="seed-icon">{{ seedIcon(s.type) }}</div>
            <div class="seed-name">{{ s.name }}</div>
            <div class="seed-type">{{ s.type }}</div>
            <div class="seed-karma">+{{ s.karma }} Karma</div>
            @if (!s.planted) {
              <button class="seed-btn" (click)="plant(s)">Plant Seed</button>
            } @else {
              <div class="seed-planted-label">🌿 Growing…</div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .seeds-shell{display:flex;flex-direction:column;gap:20px}
    .seeds-header{text-align:center}
    .seeds-title{font-family:'Orbitron',sans-serif;font-size:20px;color:#fff;margin:0 0 6px}
    .seeds-sub{font-size:13px;color:#7a9bbf;margin:0}
    .seeds-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px}
    .seed-card{background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.15);border-radius:12px;padding:18px 14px;display:flex;flex-direction:column;align-items:center;gap:10px;transition:border-color .2s}
    .seed-card:hover{border-color:rgba(0,200,255,.35)}
    .seed-card--planted{border-color:rgba(72,220,130,.3);background:rgba(72,220,130,.04)}
    .seed-rarity{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-radius:999px;padding:3px 10px;border:1px solid currentColor}
    .seed-rarity--common{color:#7a9bbf;border-color:rgba(122,155,191,.3)}
    .seed-rarity--rare{color:#5ba8ff;border-color:rgba(91,168,255,.3)}
    .seed-rarity--epic{color:#b87fff;border-color:rgba(184,127,255,.3)}
    .seed-rarity--legendary{color:#ffb43c;border-color:rgba(255,180,60,.3)}
    .seed-icon{font-size:36px}
    .seed-name{font-family:'Orbitron',sans-serif;font-size:13px;color:#fff;text-align:center}
    .seed-type{font-size:11px;color:#7a9bbf}
    .seed-karma{font-size:12px;color:#48dc82;font-weight:600}
    .seed-btn{width:100%;background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:7px;color:#fff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;letter-spacing:.08em;padding:8px;cursor:pointer;transition:opacity .2s}
    .seed-btn:hover{opacity:.85}
    .seed-planted-label{font-size:12px;color:#48dc82;font-weight:600}
  `]
})
export class SeedsComponent {
  seeds = signal<Seed[]>([
    { id: '1', name: 'Wisdom Seed', type: 'Spiritual', rarity: 'Rare', karma: 50, planted: false },
    { id: '2', name: 'Healing Seed', type: 'Health', rarity: 'Common', karma: 20, planted: false },
    { id: '3', name: 'Unity Seed', type: 'Community', rarity: 'Epic', karma: 150, planted: false },
    { id: '4', name: 'Truth Seed', type: 'Knowledge', rarity: 'Legendary', karma: 500, planted: false },
    { id: '5', name: 'Love Seed', type: 'Spiritual', rarity: 'Common', karma: 30, planted: false },
    { id: '6', name: 'Peace Seed', type: 'Community', rarity: 'Rare', karma: 75, planted: false },
  ]);

  seedIcon(type: string): string {
    const m: Record<string, string> = { Spiritual: '✨', Health: '💚', Community: '🤝', Knowledge: '📖' };
    return m[type] ?? '🌱';
  }

  plant(s: Seed) {
    this.seeds.update(list => list.map(x => x.id === s.id ? { ...x, planted: true } : x));
  }
}
