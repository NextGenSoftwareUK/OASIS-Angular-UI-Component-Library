import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NFT { id: string; name: string; rarity: string; type: string; karma: number; image: string }

@Component({
  selector: 'oasis-nft',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="nft-shell">
      <div class="nft-header"><h2 class="nft-title">🖼️ NFTs</h2><p class="nft-sub">Your OASIS non-fungible token collection.</p></div>
      <div class="nft-tabs">
        @for (t of tabs; track t) {
          <button class="nft-tab" [class.nft-tab--active]="activeTab() === t" (click)="activeTab.set(t)">{{ t }}</button>
        }
      </div>
      <div class="nft-grid">
        @for (n of filtered(); track n.id) {
          <div class="nft-card">
            <div class="nft-img">{{ n.image }}</div>
            <div class="nft-rarity nft-rarity--{{ n.rarity.toLowerCase() }}">{{ n.rarity }}</div>
            <div class="nft-name">{{ n.name }}</div>
            <div class="nft-type">{{ n.type }}</div>
            <div class="nft-karma">+{{ n.karma }} karma</div>
          </div>
        }
        @if (filtered().length === 0) { <div class="nft-empty">No NFTs in this category.</div> }
      </div>
    </div>
  `,
  styles: [`
    .nft-shell{display:flex;flex-direction:column;gap:18px}
    .nft-header{text-align:center}
    .nft-title{font-family:'Orbitron',sans-serif;font-size:20px;color:#fff;margin:0 0 6px}
    .nft-sub{font-size:13px;color:#7a9bbf;margin:0}
    .nft-tabs{display:flex;gap:8px;flex-wrap:wrap}
    .nft-tab{background:rgba(255,255,255,.05);border:1px solid rgba(0,200,255,.2);border-radius:8px;color:#7a9bbf;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;letter-spacing:.06em;padding:7px 16px;cursor:pointer;transition:all .2s}
    .nft-tab--active{background:rgba(0,200,255,.15);border-color:#00c8ff;color:#00c8ff}
    .nft-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:14px}
    .nft-card{background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.12);border-radius:12px;padding:14px;display:flex;flex-direction:column;align-items:center;gap:8px;transition:border-color .2s}
    .nft-card:hover{border-color:rgba(0,200,255,.35)}
    .nft-img{font-size:44px}
    .nft-rarity{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-radius:999px;padding:3px 10px;border:1px solid currentColor}
    .nft-rarity--common{color:#7a9bbf;border-color:rgba(122,155,191,.3)}
    .nft-rarity--rare{color:#5ba8ff;border-color:rgba(91,168,255,.3)}
    .nft-rarity--epic{color:#b87fff;border-color:rgba(184,127,255,.3)}
    .nft-rarity--legendary{color:#ffb43c;border-color:rgba(255,180,60,.3)}
    .nft-name{font-family:'Orbitron',sans-serif;font-size:12px;color:#fff;text-align:center}
    .nft-type{font-size:11px;color:#7a9bbf}
    .nft-karma{font-size:12px;color:#48dc82;font-weight:600}
    .nft-empty{grid-column:1/-1;text-align:center;color:#4a6a88;padding:32px;font-size:14px}
  `]
})
export class NftComponent {
  tabs = ['All', 'Avatar', 'Land', 'Item', 'Art'];
  activeTab = signal('All');
  nfts = signal<NFT[]>([
    { id: '1', name: 'Cosmic Warrior', rarity: 'Legendary', type: 'Avatar', karma: 500, image: '⚔️' },
    { id: '2', name: 'Forest Realm', rarity: 'Epic', type: 'Land', karma: 250, image: '🌲' },
    { id: '3', name: 'Quantum Blade', rarity: 'Rare', type: 'Item', karma: 100, image: '🗡️' },
    { id: '4', name: 'Nebula Portrait', rarity: 'Common', type: 'Art', karma: 30, image: '🎨' },
    { id: '5', name: 'Light Keeper', rarity: 'Epic', type: 'Avatar', karma: 200, image: '🌟' },
    { id: '6', name: 'Sky Citadel', rarity: 'Rare', type: 'Land', karma: 120, image: '🏰' },
  ]);
  filtered() {
    const t = this.activeTab();
    return t === 'All' ? this.nfts() : this.nfts().filter(n => n.type === t);
  }
}
