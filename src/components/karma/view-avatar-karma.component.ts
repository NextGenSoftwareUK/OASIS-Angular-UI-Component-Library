import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-view-avatar-karma',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vak-shell">
      <div class="vak-header"><span>⭐</span><h2 class="vak-title">Avatar Karma</h2></div>
      <div class="vak-score">
        <div class="vak-score-val">{{ totalKarma() }}</div>
        <div class="vak-score-lbl">Total Karma Points</div>
      </div>
      <div class="vak-breakdown">
        @for (k of karmaBreakdown(); track k.category) {
          <div class="vak-row"><span class="vak-cat">{{ k.category }}</span><div class="vak-bar-wrap"><div class="vak-bar" [style.width.%]="k.pct"></div></div><span class="vak-pts">{{ k.points }}</span></div>
        }
      </div>
      <div class="vak-footer"><button class="vak-btn" (click)="close.emit()">Close</button></div>
    </div>
  `,
  styles: [`
    .vak-shell{display:flex;flex-direction:column;gap:18px;padding:20px}
    .vak-header{display:flex;align-items:center;gap:10px}
    .vak-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .vak-score{text-align:center;padding:20px;background:rgba(255,180,60,.06);border:1px solid rgba(255,180,60,.2);border-radius:12px}
    .vak-score-val{font-family:'Orbitron',sans-serif;font-size:40px;font-weight:700;color:#ffb43c}
    .vak-score-lbl{font-size:12px;color:#7a9bbf;margin-top:4px;text-transform:uppercase;letter-spacing:.08em}
    .vak-breakdown{display:flex;flex-direction:column;gap:10px}
    .vak-row{display:flex;align-items:center;gap:12px}
    .vak-cat{font-size:12px;color:#c8dff0;width:140px;flex-shrink:0}
    .vak-bar-wrap{flex:1;height:6px;background:rgba(255,255,255,.08);border-radius:999px;overflow:hidden}
    .vak-bar{height:100%;background:linear-gradient(90deg,#ffb43c,#ff8c00);border-radius:999px;transition:width .4s}
    .vak-pts{font-size:12px;color:#ffb43c;font-weight:700;width:40px;text-align:right}
    .vak-footer{display:flex;justify-content:flex-end}
    .vak-btn{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:9px 22px;cursor:pointer}
  `]
})
export class ViewAvatarKarmaComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  totalKarma = signal(840);
  karmaBreakdown = signal([
    { category: 'Quest Completion', points: 300, pct: 80 },
    { category: 'Helping Others', points: 200, pct: 55 },
    { category: 'NFT Minting', points: 150, pct: 40 },
    { category: 'Community Votes', points: 120, pct: 32 },
    { category: 'Seeds Donated', points: 70, pct: 19 },
  ]);
}
