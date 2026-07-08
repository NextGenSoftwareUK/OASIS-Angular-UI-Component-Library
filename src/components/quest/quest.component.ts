import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Quest { id: string; title: string; description: string; reward: number; difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary'; accepted: boolean; completed: boolean }

@Component({
  selector: 'oasis-quest',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="qst-shell">
      <div class="qst-header"><h2 class="qst-title">⚔️ Quests</h2><p class="qst-sub">Embark on quests to gain karma and rare rewards.</p></div>
      <div class="qst-list">
        @for (q of quests(); track q.id) {
          <div class="qst-card" [class.qst-card--active]="q.accepted && !q.completed" [class.qst-card--done]="q.completed">
            <div class="qst-diff qst-diff--{{ q.difficulty.toLowerCase() }}">{{ q.difficulty }}</div>
            <div class="qst-body">
              <div class="qst-title-text">{{ q.title }}</div>
              <div class="qst-desc">{{ q.description }}</div>
              <div class="qst-reward">+{{ q.reward }} karma</div>
            </div>
            <div class="qst-actions">
              @if (q.completed) { <div class="qst-done">✅ Done</div> }
              @else if (!q.accepted) { <button class="qst-btn" (click)="accept(q)">Accept Quest</button> }
              @else { <button class="qst-btn qst-btn--finish" (click)="complete(q)">Finish</button> }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .qst-shell{display:flex;flex-direction:column;gap:18px}
    .qst-header{text-align:center}
    .qst-title{font-family:'Orbitron',sans-serif;font-size:20px;color:#fff;margin:0 0 6px}
    .qst-sub{font-size:13px;color:#7a9bbf;margin:0}
    .qst-list{display:flex;flex-direction:column;gap:12px}
    .qst-card{display:flex;gap:14px;align-items:flex-start;background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.12);border-radius:12px;padding:16px;transition:border-color .2s}
    .qst-card--active{border-color:rgba(0,200,255,.4)}
    .qst-card--done{opacity:.6;border-color:rgba(72,220,130,.2)}
    .qst-diff{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-radius:999px;padding:4px 10px;border:1px solid currentColor;white-space:nowrap;flex-shrink:0}
    .qst-diff--easy{color:#48dc82;border-color:rgba(72,220,130,.3)}
    .qst-diff--medium{color:#ffb43c;border-color:rgba(255,180,60,.3)}
    .qst-diff--hard{color:#ff6b6b;border-color:rgba(255,107,107,.3)}
    .qst-diff--legendary{color:#b87fff;border-color:rgba(184,127,255,.3)}
    .qst-body{flex:1}
    .qst-title-text{font-family:'Orbitron',sans-serif;font-size:13px;color:#fff;margin-bottom:4px}
    .qst-desc{font-size:12px;color:#7a9bbf;line-height:1.5;margin-bottom:6px}
    .qst-reward{font-size:12px;color:#48dc82;font-weight:600}
    .qst-actions{flex-shrink:0}
    .qst-btn{background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:7px;color:#fff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;letter-spacing:.08em;padding:8px 16px;cursor:pointer;white-space:nowrap}
    .qst-btn--finish{background:linear-gradient(135deg,#48dc82,#00aa55)}
    .qst-done{font-size:13px;color:#48dc82;font-weight:600}
  `]
})
export class QuestComponent {
  quests = signal<Quest[]>([
    { id: '1', title: 'Avatar Awakening', description: 'Complete your avatar profile and connect your first provider.', reward: 200, difficulty: 'Easy', accepted: true, completed: true },
    { id: '2', title: 'Karma Seeker', description: 'Earn 1000 karma through good deeds and OASIS contributions.', reward: 500, difficulty: 'Medium', accepted: true, completed: false },
    { id: '3', title: 'The NFT Collector', description: 'Acquire 5 unique NFTs across different categories.', reward: 1000, difficulty: 'Hard', accepted: false, completed: false },
    { id: '4', title: 'Omniverse Explorer', description: 'Visit every major hub location on the OASIS map.', reward: 2500, difficulty: 'Legendary', accepted: false, completed: false },
  ]);
  accept(q: Quest) { this.quests.update(l => l.map(x => x.id === q.id ? { ...x, accepted: true } : x)); }
  complete(q: Quest) { this.quests.update(l => l.map(x => x.id === q.id ? { ...x, completed: true } : x)); }
}
