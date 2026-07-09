import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-manage-oapp',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mf-shell">
      <div class="mf-header"><span>⚙️</span><h2 class="mf-title">Manage OAPP</h2></div>
      <div class="mf-body">
        <div class="mf-field"><label class="mf-lbl">OAPP Name</label><input class="mf-inp" placeholder="OAPP Name..." /></div>
        <div class="mf-field"><label class="mf-lbl">Version</label><input class="mf-inp" placeholder="Version..." /></div>
        <div class="mf-field"><label class="mf-lbl">Status</label><input class="mf-inp" placeholder="Status..." /></div>
        <div class="mf-field"><label class="mf-lbl">Provider</label><input class="mf-inp" placeholder="Provider..." /></div>
        <div class="mf-field"><label class="mf-lbl">Auto-Update</label><input class="mf-inp" placeholder="Auto-Update..." /></div>
      </div>
      <div class="mf-footer">
        <button class="mf-save" (click)="save()">Save</button>
        <button class="mf-cancel" (click)="close.emit()">Cancel</button>
      </div>
    </div>
  `,
  styles: [`
    .mf-shell{display:flex;flex-direction:column;gap:18px;padding:20px}
    .mf-header{display:flex;align-items:center;gap:10px}
    .mf-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .mf-body{display:flex;flex-direction:column;gap:12px}
    .mf-field{display:flex;flex-direction:column;gap:5px}
    .mf-lbl{font-size:11px;font-weight:700;letter-spacing:.07em;color:#7a9bbf;text-transform:uppercase}
    .mf-inp{background:rgba(255,255,255,.05);border:1px solid rgba(0,200,255,.25);border-radius:8px;color:#fff;font-size:13px;padding:10px 14px;outline:none}
    .mf-inp:focus{border-color:rgba(0,200,255,.6)}
    .mf-footer{display:flex;gap:10px;justify-content:flex-end}
    .mf-save{background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;padding:10px 22px;cursor:pointer}
    .mf-cancel{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:10px 18px;cursor:pointer}
  `]
})
export class ManageOAPPComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  save() { this.close.emit(); }
}
