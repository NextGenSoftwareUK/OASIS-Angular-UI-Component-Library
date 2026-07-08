import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Transaction { id: string; type: 'in' | 'out'; amount: number; currency: string; description: string; date: string }

@Component({
  selector: 'oasis-wallet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wlt-shell">
      <div class="wlt-header"><h2 class="wlt-title">💰 Wallet</h2><p class="wlt-sub">Your OASIS multi-chain wallet.</p></div>
      <div class="wlt-balances">
        @for (b of balances; track b.currency) {
          <div class="wlt-balance-card">
            <div class="wlt-currency-icon">{{ b.icon }}</div>
            <div class="wlt-currency-info">
              <div class="wlt-currency-name">{{ b.currency }}</div>
              <div class="wlt-currency-net">{{ b.network }}</div>
            </div>
            <div class="wlt-amount">{{ b.amount }} <span class="wlt-symbol">{{ b.symbol }}</span></div>
          </div>
        }
      </div>
      <div class="wlt-actions">
        <button class="wlt-action-btn">📤 Send</button>
        <button class="wlt-action-btn">📥 Receive</button>
        <button class="wlt-action-btn">🔄 Swap</button>
      </div>
      <div class="wlt-tx-header">Recent Transactions</div>
      <div class="wlt-tx-list">
        @for (t of transactions; track t.id) {
          <div class="wlt-tx">
            <div class="wlt-tx-icon wlt-tx-icon--{{ t.type }}">{{ t.type === 'in' ? '↓' : '↑' }}</div>
            <div class="wlt-tx-info"><div class="wlt-tx-desc">{{ t.description }}</div><div class="wlt-tx-date">{{ t.date }}</div></div>
            <div class="wlt-tx-amount wlt-tx-amount--{{ t.type }}">{{ t.type === 'in' ? '+' : '-' }}{{ t.amount }} {{ t.currency }}</div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .wlt-shell{display:flex;flex-direction:column;gap:18px}
    .wlt-header{text-align:center}
    .wlt-title{font-family:'Orbitron',sans-serif;font-size:20px;color:#fff;margin:0 0 6px}
    .wlt-sub{font-size:13px;color:#7a9bbf;margin:0}
    .wlt-balances{display:flex;flex-direction:column;gap:10px}
    .wlt-balance-card{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.12);border-radius:10px;padding:14px 16px}
    .wlt-currency-icon{font-size:24px}
    .wlt-currency-info{flex:1}
    .wlt-currency-name{font-family:'Orbitron',sans-serif;font-size:13px;color:#fff}
    .wlt-currency-net{font-size:11px;color:#7a9bbf;margin-top:2px}
    .wlt-amount{font-family:'Share Tech Mono',monospace;font-size:16px;color:#00c8ff;font-weight:600}
    .wlt-symbol{font-size:12px;color:#7a9bbf}
    .wlt-actions{display:flex;gap:10px}
    .wlt-action-btn{flex:1;background:rgba(0,200,255,.08);border:1px solid rgba(0,200,255,.2);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;letter-spacing:.06em;padding:10px;cursor:pointer;transition:all .2s}
    .wlt-action-btn:hover{background:rgba(0,200,255,.15)}
    .wlt-tx-header{font-family:'Orbitron',sans-serif;font-size:12px;color:#7a9bbf;letter-spacing:.06em;text-transform:uppercase}
    .wlt-tx-list{display:flex;flex-direction:column;gap:8px}
    .wlt-tx{display:flex;align-items:center;gap:12px;padding:10px 14px;background:rgba(255,255,255,.03);border:1px solid rgba(0,200,255,.08);border-radius:8px}
    .wlt-tx-icon{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0}
    .wlt-tx-icon--in{background:rgba(72,220,130,.15);color:#48dc82}
    .wlt-tx-icon--out{background:rgba(255,107,107,.15);color:#ff6b6b}
    .wlt-tx-info{flex:1}
    .wlt-tx-desc{font-size:13px;color:#e0f0ff}
    .wlt-tx-date{font-size:11px;color:#4a6a88;margin-top:2px}
    .wlt-tx-amount{font-family:'Share Tech Mono',monospace;font-size:13px;font-weight:600;white-space:nowrap}
    .wlt-tx-amount--in{color:#48dc82}
    .wlt-tx-amount--out{color:#ff6b6b}
  `]
})
export class WalletComponent {
  balances = [
    { icon: '⟠', currency: 'Ethereum', network: 'Mainnet', amount: '0.4821', symbol: 'ETH' },
    { icon: '◎', currency: 'Solana', network: 'Mainnet', amount: '12.305', symbol: 'SOL' },
    { icon: '⬡', currency: 'Polygon', network: 'Mainnet', amount: '245.00', symbol: 'MATIC' },
  ];
  transactions: Transaction[] = [
    { id: '1', type: 'in', amount: 0.05, currency: 'ETH', description: 'NFT Sale — Cosmic Warrior', date: '2 hours ago' },
    { id: '2', type: 'out', amount: 12, currency: 'SOL', description: 'Quest Reward Conversion', date: '1 day ago' },
    { id: '3', type: 'in', amount: 100, currency: 'MATIC', description: 'Karma Reward Payout', date: '3 days ago' },
  ];
}
