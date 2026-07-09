import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'oasis-search-quest',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="sf-shell">
      <div class="sf-header"><span>🔍</span><h2 class="sf-title">Search Quests</h2></div>
      <div class="sf-row"><input class="sf-input" [(ngModel)]="query" placeholder="Search quests by name, difficulty, or reward..." (keyup.enter)="search()" /><button class="sf-btn" (click)="search()">Search</button></div>
      @for (r of results(); track r) { <div class="sf-result">{{ r }}</div> }
      <div class="sf-footer"><button class="sf-cancel" (click)="close.emit()">Close</button></div>
    </div>
  `,
  styles: [`
    .sf-shell{display:flex;flex-direction:column;gap:14px;padding:20px}
    .sf-header{display:flex;align-items:center;gap:10px}
    .sf-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .sf-row{display:flex;gap:10px}
    .sf-input{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(0,200,255,.25);border-radius:8px;color:#fff;font-size:13px;padding:10px 14px;outline:none}
    .sf-input:focus{border-color:rgba(0,200,255,.6)}
    .sf-btn{background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;padding:10px 20px;cursor:pointer;white-space:nowrap}
    .sf-result{background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.12);border-radius:8px;color:#c8dff0;font-size:13px;padding:10px 14px}
    .sf-footer{display:flex;justify-content:flex-end}
    .sf-cancel{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:8px 20px;cursor:pointer}
  `]
})
export class SearchQuestComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  query = '';
  results = signal<string[]>([]);
  search() { if (this.query.trim()) this.results.set(['No results found for "' + this.query + '"']); }
}
