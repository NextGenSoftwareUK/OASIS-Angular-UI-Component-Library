import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-launch-oapp',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lo-shell">
      <div class="lo-header"><span>🚀</span><h2 class="lo-title">Launch OAPP</h2></div>
      <div class="lo-list">
        @for (app of oapps(); track app.id) {
          <div class="lo-card" (click)="selected.set(app.id)" [class.lo-card--sel]="selected()===app.id">
            <div class="lo-icon">{{ app.icon }}</div>
            <div class="lo-info"><div class="lo-name">{{ app.name }}</div><div class="lo-version">v{{ app.version }}</div></div>
            <div class="lo-status lo-status--{{ app.status.toLowerCase() }}">{{ app.status }}</div>
          </div>
        }
      </div>
      <div class="lo-footer">
        <button class="lo-launch" [disabled]="!selected()" (click)="launch()">Launch</button>
        <button class="lo-cancel" (click)="close.emit()">Cancel</button>
      </div>
    </div>
  `,
  styles: [`
    .lo-shell{display:flex;flex-direction:column;gap:16px;padding:20px}
    .lo-header{display:flex;align-items:center;gap:10px}
    .lo-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .lo-list{display:flex;flex-direction:column;gap:8px}
    .lo-card{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.12);border-radius:10px;padding:12px 16px;cursor:pointer;transition:border-color .2s}
    .lo-card:hover{border-color:rgba(0,200,255,.3)}
    .lo-card--sel{border-color:#00c8ff;background:rgba(0,200,255,.08)}
    .lo-icon{font-size:28px}
    .lo-info{flex:1}
    .lo-name{font-family:'Orbitron',sans-serif;font-size:13px;color:#fff}
    .lo-version{font-size:11px;color:#7a9bbf;margin-top:2px}
    .lo-status{font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;border-radius:999px;padding:2px 9px;border:1px solid currentColor}
    .lo-status--installed{color:#00c864;border-color:rgba(0,200,100,.3)}
    .lo-status--available{color:#5ba8ff;border-color:rgba(91,168,255,.3)}
    .lo-footer{display:flex;gap:10px;justify-content:flex-end}
    .lo-launch{background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;padding:10px 22px;cursor:pointer}
    .lo-launch:disabled{opacity:.4;cursor:not-allowed}
    .lo-cancel{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:10px 18px;cursor:pointer}
  `]
})
export class LaunchOAPPComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  selected = signal<number|null>(null);
  oapps = signal([
    { id:1, icon:'🎮', name:'OASIS Game Hub', version:'1.4.2', status:'Installed' },
    { id:2, icon:'🗺️', name:'World Explorer', version:'2.1.0', status:'Installed' },
    { id:3, icon:'💹', name:'SEEDS Market', version:'1.0.5', status:'Available' },
    { id:4, icon:'📡', name:'ONET Messenger', version:'3.0.1', status:'Installed' },
  ]);
  launch() { this.close.emit(); }
}
