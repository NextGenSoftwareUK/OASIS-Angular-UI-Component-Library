import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-load-data',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="popup-shell">
      <div class="popup-icon">📂</div>
      <h2 class="popup-title">Load Data</h2>
      <p class="popup-body">UI Coming Soon — access this feature via the OASIS API from the Developer menu.</p>
      <button class="popup-btn" (click)="close.emit()">OK</button>
    </div>
  `,
  styles: [`
    .popup-shell{display:flex;flex-direction:column;align-items:center;gap:16px;padding:24px;text-align:center}
    .popup-icon{font-size:48px}
    .popup-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .popup-body{font-size:13px;color:#a8bfd8;line-height:1.6;margin:0;max-width:380px}
    .popup-btn{background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;padding:10px 28px;cursor:pointer;transition:opacity .2s}
    .popup-btn:hover{opacity:.85}
  `]
})
export class LoadDataComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
}
