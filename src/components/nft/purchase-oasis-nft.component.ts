import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-purchase-oasis-nft',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pn-shell">
      <div class="pn-header"><span>🛒</span><h2 class="pn-title">Purchase OASIS NFT</h2></div>
      <div class="pn-list">
        @for (nft of nfts(); track nft.id) {
          <div class="pn-card" (click)="selected.set(nft.id)" [class.pn-card--sel]="selected()===nft.id">
            <div class="pn-emoji">{{ nft.emoji }}</div>
            <div class="pn-info"><div class="pn-name">{{ nft.name }}</div><div class="pn-price">{{ nft.price }}</div></div>
          </div>
        }
      </div>
      <div class="pn-footer">
        <button class="pn-buy" [disabled]="!selected()" (click)="buy()">Purchase</button>
        <button class="pn-cancel" (click)="close.emit()">Cancel</button>
      </div>
    </div>
  `,
  styles: [`
    .pn-shell{display:flex;flex-direction:column;gap:16px;padding:20px}
    .pn-header{display:flex;align-items:center;gap:10px}
    .pn-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .pn-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px}
    .pn-card{background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.12);border-radius:10px;padding:14px;display:flex;align-items:center;gap:10px;cursor:pointer;transition:border-color .2s}
    .pn-card:hover{border-color:rgba(0,200,255,.3)}
    .pn-card--sel{border-color:#00c8ff;background:rgba(0,200,255,.08)}
    .pn-emoji{font-size:28px}
    .pn-name{font-family:'Orbitron',sans-serif;font-size:12px;color:#fff}
    .pn-price{font-size:12px;color:#ffb43c;font-weight:700;margin-top:2px}
    .pn-footer{display:flex;gap:10px;justify-content:flex-end}
    .pn-buy{background:linear-gradient(135deg,#ffb43c,#ff8c00);border:none;border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;padding:10px 22px;cursor:pointer}
    .pn-buy:disabled{opacity:.4;cursor:not-allowed}
    .pn-cancel{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:10px 18px;cursor:pointer}
  `]
})
export class PurchaseOasisNftComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  selected = signal<number|null>(null);
  nfts = signal([
    { id:1, emoji:'🏛️', name:'OASIS Hub Alpha', price:'0.05 ETH' },
    { id:2, emoji:'🌌', name:'Cosmic Artifact', price:'0.12 ETH' },
    { id:3, emoji:'🐉', name:'Dragon Companion', price:'0.25 ETH' },
    { id:4, emoji:'💎', name:'Crystal Gem', price:'0.08 ETH' },
  ]);
  buy() { this.selected.set(null); this.close.emit(); }
}
