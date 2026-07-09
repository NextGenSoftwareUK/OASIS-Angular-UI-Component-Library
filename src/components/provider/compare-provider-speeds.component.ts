import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-compare-provider-speeds',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cps-shell">
      <div class="cps-header"><span>⚡</span><h2 class="cps-title">Compare Provider Speeds</h2></div>
      <div class="cps-list">
        @for (p of providers(); track p.name) {
          <div class="cps-row">
            <div class="cps-name">{{ p.name }}</div>
            <div class="cps-bar-wrap"><div class="cps-bar" [style.width.%]="p.speed"></div></div>
            <div class="cps-ms">{{ p.ms }}ms</div>
          </div>
        }
      </div>
      <div class="cps-footer"><button class="cps-btn" (click)="close.emit()">Close</button></div>
    </div>
  `,
  styles: [`
    .cps-shell{display:flex;flex-direction:column;gap:16px;padding:20px}
    .cps-header{display:flex;align-items:center;gap:10px}
    .cps-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .cps-list{display:flex;flex-direction:column;gap:10px}
    .cps-row{display:flex;align-items:center;gap:12px}
    .cps-name{width:120px;font-size:12px;color:#c8dff0;flex-shrink:0}
    .cps-bar-wrap{flex:1;height:8px;background:rgba(255,255,255,.08);border-radius:999px;overflow:hidden}
    .cps-bar{height:100%;background:linear-gradient(90deg,#00c8ff,#0080ff);border-radius:999px;transition:width .6s}
    .cps-ms{width:50px;font-size:12px;color:#7a9bbf;text-align:right;flex-shrink:0}
    .cps-footer{display:flex;justify-content:flex-end}
    .cps-btn{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:9px 22px;cursor:pointer}
  `]
})
export class CompareProviderSpeedsComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  providers = signal([
    { name: 'Holochain', speed: 95, ms: 12 },
    { name: 'IPFS', speed: 72, ms: 45 },
    { name: 'Ethereum', speed: 48, ms: 180 },
    { name: 'MongoDB', speed: 98, ms: 5 },
    { name: 'Neo4j', speed: 88, ms: 22 },
    { name: 'SQLite', speed: 100, ms: 1 },
  ]);
}
