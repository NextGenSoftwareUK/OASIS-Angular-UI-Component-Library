import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-mongo-db',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pi-shell">
      <div class="pi-header"><div class="pi-icon">🍃</div><h2 class="pi-title">MongoDB</h2></div>
      <div class="pi-body">
        <div class="pi-row"><span class="pi-label">Provider</span><span class="pi-value">MongoDB</span></div>
        <div class="pi-row"><span class="pi-label">Website</span><span class="pi-value">mongodb.com</span></div>
        <div class="pi-row"><span class="pi-label">Status</span><span class="pi-badge pi-badge--active">Active</span></div>
        <div class="pi-row"><span class="pi-label">Description</span><span class="pi-value" style="max-width:240px;text-align:right;font-size:12px;color:#a8bfd8">Document-oriented NoSQL database for modern applications.</span></div>
      </div>
      <div class="pi-footer">
        <button class="pi-btn-primary" (click)="connect()">Connect</button>
        <button class="pi-btn-cancel" (click)="close.emit()">Cancel</button>
      </div>
    </div>
  `,
  styles: [`
        .pi-shell{display:flex;flex-direction:column;gap:16px;padding:20px}
    .pi-header{display:flex;align-items:center;gap:12px}
    .pi-icon{font-size:36px}
    .pi-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .pi-body{background:rgba(255,255,255,.03);border:1px solid rgba(0,200,255,.1);border-radius:10px;padding:16px;display:flex;flex-direction:column;gap:10px}
    .pi-row{display:flex;justify-content:space-between;align-items:center;font-size:13px}
    .pi-label{color:#7a9bbf}
    .pi-value{color:#c8dff0;font-weight:500}
    .pi-badge{font-size:10px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;border-radius:999px;padding:2px 9px;border:1px solid currentColor}
    .pi-badge--active{color:#00c864;border-color:rgba(0,200,100,.3)}
    .pi-badge--inactive{color:#7a9bbf;border-color:rgba(122,155,191,.25)}
    .pi-footer{display:flex;gap:10px;justify-content:flex-end}
    .pi-btn-primary{background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:9px 18px;cursor:pointer}
    .pi-btn-cancel{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:9px 18px;cursor:pointer}
  `]
})
export class MongoDbComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  connect() { this.close.emit(); }
}
