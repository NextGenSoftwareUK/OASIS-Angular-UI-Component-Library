import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'oasis-vote-karma',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="vok-shell">
      <div class="vok-header"><span>🗳️</span><h2 class="vok-title">Vote Karma</h2></div>
      <div class="vok-field"><label class="vok-lbl">Avatar Name</label><input class="vok-input" [(ngModel)]="avatarName" placeholder="Enter avatar name..." /></div>
      <div class="vok-vote-row">
        <button class="vok-upvote" (click)="vote('up')">👍 Upvote Karma</button>
        <button class="vok-downvote" (click)="vote('down')">👎 Downvote Karma</button>
      </div>
      @if (message()) { <div class="vok-message">{{ message() }}</div> }
      <div class="vok-footer"><button class="vok-cancel" (click)="close.emit()">Close</button></div>
    </div>
  `,
  styles: [`
    .vok-shell{display:flex;flex-direction:column;gap:18px;padding:20px}
    .vok-header{display:flex;align-items:center;gap:10px}
    .vok-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .vok-field{display:flex;flex-direction:column;gap:6px}
    .vok-lbl{font-size:11px;font-weight:700;letter-spacing:.07em;color:#7a9bbf;text-transform:uppercase}
    .vok-input{background:rgba(255,255,255,.05);border:1px solid rgba(0,200,255,.25);border-radius:8px;color:#fff;font-size:13px;padding:10px 14px;outline:none}
    .vok-input:focus{border-color:rgba(0,200,255,.6)}
    .vok-vote-row{display:flex;gap:12px}
    .vok-upvote,.vok-downvote{flex:1;border:none;border-radius:8px;font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;padding:12px;cursor:pointer;transition:opacity .2s}
    .vok-upvote{background:linear-gradient(135deg,#00c864,#007840);color:#fff}
    .vok-downvote{background:linear-gradient(135deg,#ff4444,#cc0000);color:#fff}
    .vok-upvote:hover,.vok-downvote:hover{opacity:.85}
    .vok-message{background:rgba(0,200,255,.08);border:1px solid rgba(0,200,255,.2);border-radius:8px;color:#c8dff0;font-size:13px;padding:12px 16px;text-align:center}
    .vok-footer{display:flex;justify-content:flex-end}
    .vok-cancel{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:8px 20px;cursor:pointer}
  `]
})
export class VoteKarmaComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  avatarName = '';
  message = signal('');
  vote(direction: 'up' | 'down') {
    if (!this.avatarName.trim()) { this.message.set('Please enter an avatar name.'); return; }
    this.message.set(direction === 'up' ? 'Upvoted karma for ' + this.avatarName + '!' : 'Downvoted karma for ' + this.avatarName + '.');
  }
}
