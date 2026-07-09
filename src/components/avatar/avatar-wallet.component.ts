import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-avatar-wallet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="aw-shell">
      <div class="aw-header"><span class="aw-icon">💰</span><h2 class="aw-title">Avatar Wallet</h2></div>
      <div class="aw-table-wrap">
        <table class="aw-table">
          <thead><tr><th>Date</th><th>Note</th><th>From Avatar</th><th>Token</th><th>Amount</th><th>Balance</th><th>Provider</th><th>Type</th></tr></thead>
          <tbody>
            @for (row of transactions(); track row.id) {
              <tr><td>{{ row.date }}</td><td>{{ row.note }}</td><td>{{ row.fromAvatar }}</td><td>{{ row.token }}</td><td>{{ row.amount }}</td><td>{{ row.balance }}</td><td>{{ row.provider }}</td><td><span class="aw-badge aw-badge--{{ row.type.toLowerCase() }}">{{ row.type }}</span></td></tr>
            }
          </tbody>
        </table>
      </div>
      <div class="aw-footer"><button class="aw-btn" (click)="close.emit()">Close</button></div>
    </div>
  `,
  styles: [`
    .aw-shell{display:flex;flex-direction:column;gap:16px;padding:20px}
    .aw-header{display:flex;align-items:center;gap:10px}
    .aw-icon{font-size:26px}
    .aw-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .aw-table-wrap{overflow-x:auto;border:1px solid rgba(0,200,255,.15);border-radius:10px}
    .aw-table{width:100%;border-collapse:collapse;font-size:13px}
    .aw-table th{background:rgba(0,200,255,.08);color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;letter-spacing:.06em;padding:10px 12px;text-align:left;border-bottom:1px solid rgba(0,200,255,.15);white-space:nowrap}
    .aw-table td{color:#c8dff0;padding:9px 12px;border-bottom:1px solid rgba(255,255,255,.04)}
    .aw-table tr:last-child td{border-bottom:none}
    .aw-table tr:hover td{background:rgba(0,200,255,.04)}
    .aw-badge{border-radius:999px;padding:2px 9px;font-size:10px;font-weight:700}
    .aw-badge--credit{background:rgba(0,200,100,.15);color:#00c864;border:1px solid rgba(0,200,100,.3)}
    .aw-badge--debit{background:rgba(255,80,80,.12);color:#ff5050;border:1px solid rgba(255,80,80,.3)}
    .aw-footer{display:flex;justify-content:flex-end}
    .aw-btn{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:9px 22px;cursor:pointer}
  `]
})
export class AvatarWalletComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  transactions = signal([
    { id: 1, date: '2026-07-01', note: 'Quest reward', fromAvatar: 'StarWalker', token: 'SEEDS', amount: '50', balance: '350', provider: 'Holochain', type: 'Credit' },
    { id: 2, date: '2026-07-03', note: 'NFT purchase', fromAvatar: 'Self', token: 'ETH', amount: '0.05', balance: '1.12', provider: 'Ethereum', type: 'Debit' },
  ]);
}
