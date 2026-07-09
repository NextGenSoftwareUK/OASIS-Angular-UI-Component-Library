import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-view-oasis-nft',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="von-shell">
      <div class="von-header"><span>🎨</span><h2 class="von-title">View OASIS NFTs</h2></div>
      <div class="von-grid">
        @for (nft of nfts(); track nft.id) {
          <div class="von-card">
            <div class="von-preview">{{ nft.emoji }}</div>
            <div class="von-body">
              <div class="von-name">{{ nft.name }}</div>
              <div class="von-collection">{{ nft.collection }}</div>
              <div class="von-price">{{ nft.price }}</div>
            </div>
          </div>
        }
      </div>
      <div class="von-footer"><button class="von-btn" (click)="close.emit()">Close</button></div>
    </div>
  `,
  styles: [`
    .von-shell{display:flex;flex-direction:column;gap:16px;padding:20px}
    .von-header{display:flex;align-items:center;gap:10px}
    .von-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .von-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}
    .von-card{background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.12);border-radius:10px;overflow:hidden}
    .von-preview{font-size:48px;display:flex;align-items:center;justify-content:center;height:80px;background:rgba(0,200,255,.05)}
    .von-body{padding:10px 12px}
    .von-name{font-family:'Orbitron',sans-serif;font-size:11px;color:#fff}
    .von-collection{font-size:10px;color:#7a9bbf;margin-top:2px}
    .von-price{font-size:11px;color:#ffb43c;font-weight:700;margin-top:4px}
    .von-footer{display:flex;justify-content:flex-end}
    .von-btn{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:9px 22px;cursor:pointer}
  `]
})
export class ViewOasisNftComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  nfts = signal([
    { id:1, emoji:'🏛️', name:'OASIS Hub Alpha', collection:'Genesis', price:'0.05 ETH' },
    { id:2, emoji:'🌌', name:'Cosmic Artifact', collection:'Cosmic', price:'0.12 ETH' },
    { id:3, emoji:'🐉', name:'Dragon Companion', collection:'Beasts', price:'0.25 ETH' },
    { id:4, emoji:'💎', name:'Crystal Gem', collection:'Gems', price:'0.08 ETH' },
    { id:5, emoji:'🚀', name:'Starship', collection:'Vehicles', price:'0.15 ETH' },
    { id:6, emoji:'🌺', name:'Rare Bloom', collection:'Flora', price:'0.03 ETH' },
  ]);
}
