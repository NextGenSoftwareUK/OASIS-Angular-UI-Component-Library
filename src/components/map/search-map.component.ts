import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'oasis-search-map',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="sm-shell">
      <div class="sm-header"><span>🔍</span><h2 class="sm-title">Search Map</h2></div>
      <div class="sm-row"><input class="sm-input" [(ngModel)]="query" placeholder="Search locations, objects, quests..." (keyup.enter)="search()" /><button class="sm-btn" (click)="search()">Search</button></div>
      @for (r of results(); track r.name) {
        <div class="sm-card"><div class="sm-card-icon">{{ r.icon }}</div><div class="sm-card-info"><div class="sm-card-name">{{ r.name }}</div><div class="sm-card-type">{{ r.type }}</div></div></div>
      }
      <div class="sm-footer"><button class="sm-cancel" (click)="close.emit()">Close</button></div>
    </div>
  `,
  styles: [`
    .sm-shell{display:flex;flex-direction:column;gap:14px;padding:20px}
    .sm-header{display:flex;align-items:center;gap:10px}
    .sm-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .sm-row{display:flex;gap:10px}
    .sm-input{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(0,200,255,.25);border-radius:8px;color:#fff;font-size:13px;padding:10px 14px;outline:none}
    .sm-input:focus{border-color:rgba(0,200,255,.6)}
    .sm-btn{background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;padding:10px 20px;cursor:pointer;white-space:nowrap}
    .sm-card{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.12);border-radius:8px;padding:10px 14px}
    .sm-card-icon{font-size:24px}
    .sm-card-name{font-family:'Orbitron',sans-serif;font-size:13px;color:#fff}
    .sm-card-type{font-size:11px;color:#7a9bbf;text-transform:uppercase;letter-spacing:.06em;margin-top:2px}
    .sm-footer{display:flex;justify-content:flex-end}
    .sm-cancel{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:8px 20px;cursor:pointer}
  `]
})
export class SearchMapComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  query = '';
  results = signal<{name:string;type:string;icon:string}[]>([]);
  search() {
    if (!this.query.trim()) return;
    this.results.set([{ name: this.query + ' Hub', type: 'Location', icon: '🏛️' }]);
  }
}
