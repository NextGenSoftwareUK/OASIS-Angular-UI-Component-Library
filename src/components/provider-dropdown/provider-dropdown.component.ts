import { Component, signal, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Provider { id: string; name: string; icon: string; color: string }

@Component({
  selector: 'oasis-provider-dropdown',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pd-shell">
      <div class="pd-trigger" [class.pd-trigger--open]="open()" (click)="open.set(!open())">
        <div class="pd-icon" [style.color]="selected().color">{{ selected().icon }}</div>
        <div class="pd-label">
          <div class="pd-name">{{ selected().name }}</div>
          <div class="pd-sub">Active Provider</div>
        </div>
        <div class="pd-arrow" [class.pd-arrow--open]="open()">▼</div>
      </div>
      @if (open()) {
        <div class="pd-menu">
          @for (p of providers; track p.id) {
            <div class="pd-option" [class.pd-option--selected]="p.id === selected().id" (click)="select(p)">
              <div class="pd-opt-icon" [style.color]="p.color">{{ p.icon }}</div>
              <div class="pd-opt-name">{{ p.name }}</div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    :host{display:block;position:relative}
    .pd-shell{position:relative}
    .pd-trigger{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.05);border:1px solid rgba(0,200,255,.25);border-radius:10px;padding:10px 14px;cursor:pointer;transition:border-color .2s;color:#fff}
    .pd-trigger:hover,.pd-trigger--open{border-color:rgba(0,200,255,.5)}
    .pd-icon{font-size:20px;width:28px;text-align:center}
    .pd-label{flex:1}
    .pd-name{font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;color:#fff}
    .pd-sub{font-size:11px;color:#7a9bbf;margin-top:2px}
    .pd-arrow{font-size:10px;color:#7a9bbf;transition:transform .2s}
    .pd-arrow--open{transform:rotate(180deg)}
    .pd-menu{position:absolute;top:calc(100% + 6px);left:0;right:0;background:#0d1b2e;border:1px solid rgba(0,200,255,.2);border-radius:10px;overflow:hidden;z-index:100;box-shadow:0 8px 32px rgba(0,0,0,.5)}
    .pd-option{display:flex;align-items:center;gap:10px;padding:10px 14px;cursor:pointer;transition:background .15s;color:#e0f0ff}
    .pd-option:hover{background:rgba(0,200,255,.1)}
    .pd-option--selected{background:rgba(0,200,255,.12);border-left:3px solid #00c8ff}
    .pd-opt-icon{font-size:18px;width:24px;text-align:center}
    .pd-opt-name{font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700}
  `]
})
export class ProviderDropdownComponent {
  @Output() providerChange = new EventEmitter<Provider>();
  open = signal(false);
  providers: Provider[] = [
    { id: 'ethereum', name: 'Ethereum', icon: '⟠', color: '#627eea' },
    { id: 'solana', name: 'Solana', icon: '◎', color: '#9945ff' },
    { id: 'polygon', name: 'Polygon', icon: '⬡', color: '#8247e5' },
    { id: 'arbitrum', name: 'Arbitrum', icon: '🔵', color: '#2d9cdb' },
    { id: 'eosio', name: 'EOSIO', icon: '🔮', color: '#443f54' },
    { id: 'holochain', name: 'Holochain', icon: '⬡', color: '#00e5be' },
  ];
  selected = signal<Provider>(this.providers[0]);
  select(p: Provider) { this.selected.set(p); this.open.set(false); this.providerChange.emit(p); }
}
