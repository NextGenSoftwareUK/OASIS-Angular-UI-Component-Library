import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'oasis-message',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="msg-shell">
      <div class="msg-header"><span>✉️</span><h2 class="msg-title">Message</h2></div>
      <div class="msg-thread">
        @for (m of messages(); track m.id) {
          <div class="msg-bubble" [class.msg-bubble--mine]="m.mine">
            <div class="msg-sender">{{ m.sender }}</div>
            <div class="msg-text">{{ m.text }}</div>
            <div class="msg-time">{{ m.time }}</div>
          </div>
        }
      </div>
      <div class="msg-compose">
        <input class="msg-input" [(ngModel)]="draft" placeholder="Type a message..." (keyup.enter)="send()" />
        <button class="msg-send" (click)="send()">Send</button>
      </div>
      <div class="msg-footer"><button class="msg-cancel" (click)="close.emit()">Close</button></div>
    </div>
  `,
  styles: [`
    .msg-shell{display:flex;flex-direction:column;gap:14px;padding:20px}
    .msg-header{display:flex;align-items:center;gap:10px}
    .msg-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .msg-thread{display:flex;flex-direction:column;gap:8px;max-height:280px;overflow-y:auto;padding:4px 0}
    .msg-bubble{background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.1);border-radius:10px;padding:10px 14px;max-width:80%}
    .msg-bubble--mine{align-self:flex-end;background:rgba(0,200,255,.1);border-color:rgba(0,200,255,.25)}
    .msg-sender{font-size:11px;font-weight:700;color:#5ba8ff;margin-bottom:4px}
    .msg-text{font-size:13px;color:#c8dff0}
    .msg-time{font-size:10px;color:#7a9bbf;margin-top:4px;text-align:right}
    .msg-compose{display:flex;gap:10px}
    .msg-input{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(0,200,255,.25);border-radius:8px;color:#fff;font-size:13px;padding:10px 14px;outline:none}
    .msg-input:focus{border-color:rgba(0,200,255,.6)}
    .msg-send{background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;padding:10px 18px;cursor:pointer;white-space:nowrap}
    .msg-footer{display:flex;justify-content:flex-end}
    .msg-cancel{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:8px 20px;cursor:pointer}
  `]
})
export class MessageComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  draft = '';
  messages = signal([
    { id:1, sender:'CosmicSage', text:'Welcome to the OASIS!', time:'10:30', mine:false },
    { id:2, sender:'You', text:'Thanks! Great to be here.', time:'10:31', mine:true },
  ]);
  send() {
    if (!this.draft.trim()) return;
    this.messages.update(m => [...m, { id: m.length+1, sender:'You', text:this.draft, time:new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}), mine:true }]);
    this.draft = '';
  }
}
