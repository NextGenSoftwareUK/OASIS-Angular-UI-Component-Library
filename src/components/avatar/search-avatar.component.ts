import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'oasis-search-avatar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="sa-shell">
      <div class="sa-header"><span>🔍</span><h2 class="sa-title">Search Avatars</h2></div>
      <div class="sa-row">
        <input class="sa-input" [(ngModel)]="query" placeholder="Username or avatar name..." (keyup.enter)="search()" />
        <button class="sa-btn" (click)="search()">Search</button>
      </div>
      @for (r of results(); track r.name) {
        <div class="sa-card"><div class="sa-name">{{ r.name }}</div><div class="sa-meta">Level {{ r.level }} · {{ r.karma }} karma</div></div>
      }
      <button class="sa-cancel" (click)="close.emit()">Close</button>
    </div>
  `,
  styles: [`
    .sa-shell{display:flex;flex-direction:column;gap:14px;padding:20px}
    .sa-header{display:flex;align-items:center;gap:10px}
    .sa-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .sa-row{display:flex;gap:10px}
    .sa-input{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(0,200,255,.25);border-radius:8px;color:#fff;font-size:13px;padding:10px 14px;outline:none}
    .sa-input:focus{border-color:rgba(0,200,255,.6)}
    .sa-btn{background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;padding:10px 20px;cursor:pointer}
    .sa-card{background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.12);border-radius:8px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center}
    .sa-name{font-family:'Orbitron',sans-serif;font-size:13px;color:#fff}
    .sa-meta{font-size:12px;color:#7a9bbf}
    .sa-cancel{align-self:flex-end;background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:8px 20px;cursor:pointer}
  `]
})
export class SearchAvatarComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  query = '';
  results = signal<{name:string;level:number;karma:number}[]>([]);
  search() {
    if (!this.query.trim()) return;
    this.results.set([{ name: this.query, level: 7, karma: 420 }]);
  }
}
