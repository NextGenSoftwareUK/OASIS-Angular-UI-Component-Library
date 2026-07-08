import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Game { id: string; name: string; genre: string; description: string; players: number; karma: number; icon: string; playing: boolean }

@Component({
  selector: 'oasis-game',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-shell">
      <div class="game-header"><h2 class="game-title">🎮 Games</h2><p class="game-sub">Play games in the OASIS to earn karma and rewards.</p></div>
      <div class="game-grid">
        @for (g of games(); track g.id) {
          <div class="game-card" [class.game-card--playing]="g.playing">
            <div class="game-icon">{{ g.icon }}</div>
            <div class="game-genre">{{ g.genre }}</div>
            <div class="game-name">{{ g.name }}</div>
            <div class="game-desc">{{ g.description }}</div>
            <div class="game-meta">
              <div class="game-players">👥 {{ g.players.toLocaleString() }}</div>
              <div class="game-karma">+{{ g.karma }} karma/hr</div>
            </div>
            <button class="game-btn" [class.game-btn--stop]="g.playing" (click)="toggle(g)">{{ g.playing ? '⏹ Stop' : '▶ Play' }}</button>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .game-shell{display:flex;flex-direction:column;gap:18px}
    .game-header{text-align:center}
    .game-title{font-family:'Orbitron',sans-serif;font-size:20px;color:#fff;margin:0 0 6px}
    .game-sub{font-size:13px;color:#7a9bbf;margin:0}
    .game-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px}
    .game-card{background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.12);border-radius:12px;padding:18px 14px;display:flex;flex-direction:column;gap:8px;transition:border-color .2s}
    .game-card:hover{border-color:rgba(0,200,255,.3)}
    .game-card--playing{border-color:rgba(0,200,255,.5);background:rgba(0,200,255,.05)}
    .game-icon{font-size:40px}
    .game-genre{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#5ba8ff}
    .game-name{font-family:'Orbitron',sans-serif;font-size:13px;color:#fff}
    .game-desc{font-size:12px;color:#7a9bbf;line-height:1.5;flex:1}
    .game-meta{display:flex;justify-content:space-between}
    .game-players{font-size:11px;color:#7a9bbf}
    .game-karma{font-size:11px;color:#48dc82;font-weight:600}
    .game-btn{background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;padding:9px;cursor:pointer;transition:opacity .2s;margin-top:4px}
    .game-btn--stop{background:rgba(255,80,80,.2);border:1px solid rgba(255,80,80,.35);color:#ff6b6b}
  `]
})
export class GameComponent {
  games = signal<Game[]>([
    { id: '1', name: 'Karma Wars', genre: 'Strategy', description: 'Battle other avatars for karma dominance in real-time.', players: 12450, karma: 50, icon: '⚔️', playing: false },
    { id: '2', name: 'Seed Garden', genre: 'Simulation', description: 'Grow and cultivate a virtual garden to earn seeds and karma.', players: 8900, karma: 30, icon: '🌱', playing: false },
    { id: '3', name: 'OASIS Racer', genre: 'Racing', description: 'Race across virtual worlds and earn speed karma.', players: 5600, karma: 40, icon: '🏎️', playing: false },
    { id: '4', name: 'NFT Quest', genre: 'RPG', description: 'An epic RPG adventure to discover legendary NFTs.', players: 22000, karma: 80, icon: '🗡️', playing: false },
  ]);
  toggle(g: Game) { this.games.update(l => l.map(x => x.id === g.id ? { ...x, playing: !x.playing } : x)); }
}
