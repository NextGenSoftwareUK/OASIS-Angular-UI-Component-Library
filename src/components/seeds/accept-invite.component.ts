import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'oasis-accept-invite',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="ai-shell">
      <div class="ai-header"><span>🤝</span><h2 class="ai-title">Accept Invite</h2></div>
      <div class="ai-field"><label class="ai-lbl">Invite Code</label><input class="ai-inp" [(ngModel)]="code" placeholder="Enter your invite code..." /></div>
      @if (message()) { <div class="ai-message">{{ message() }}</div> }
      <div class="ai-footer">
        <button class="ai-accept" (click)="accept()">Accept</button>
        <button class="ai-cancel" (click)="close.emit()">Cancel</button>
      </div>
    </div>
  `,
  styles: [`
    .ai-shell{display:flex;flex-direction:column;gap:18px;padding:20px}
    .ai-header{display:flex;align-items:center;gap:10px}
    .ai-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .ai-field{display:flex;flex-direction:column;gap:6px}
    .ai-lbl{font-size:11px;font-weight:700;letter-spacing:.07em;color:#7a9bbf;text-transform:uppercase}
    .ai-inp{background:rgba(255,255,255,.05);border:1px solid rgba(0,200,255,.25);border-radius:8px;color:#fff;font-size:13px;padding:10px 14px;outline:none}
    .ai-inp:focus{border-color:rgba(0,200,255,.6)}
    .ai-message{background:rgba(0,200,100,.08);border:1px solid rgba(0,200,100,.2);border-radius:8px;color:#00c864;font-size:13px;padding:12px 16px}
    .ai-footer{display:flex;gap:10px;justify-content:flex-end}
    .ai-accept{background:linear-gradient(135deg,#00c864,#007840);border:none;border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;padding:10px 22px;cursor:pointer}
    .ai-cancel{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:10px 18px;cursor:pointer}
  `]
})
export class AcceptInviteComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  code = '';
  message = signal('');
  accept() {
    if (!this.code.trim()) return;
    this.message.set('Invite accepted! Welcome to the OASIS community.');
    setTimeout(() => this.close.emit(), 1500);
  }
}
