import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-view-organizations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vo-shell">
      <div class="vo-header"><span>🏢</span><h2 class="vo-title">View Organizations</h2></div>
      <div class="vo-list">
        @for (org of organizations(); track org.id) {
          <div class="vo-card">
            <div class="vo-icon">{{ org.icon }}</div>
            <div class="vo-info">
              <div class="vo-name">{{ org.name }}</div>
              <div class="vo-members">{{ org.members }} members</div>
              <div class="vo-desc">{{ org.description }}</div>
            </div>
            <button class="vo-join" (click)="join(org.id)">{{ org.joined ? 'Joined' : 'Join' }}</button>
          </div>
        }
      </div>
      <div class="vo-footer"><button class="vo-btn" (click)="close.emit()">Close</button></div>
    </div>
  `,
  styles: [`
    .vo-shell{display:flex;flex-direction:column;gap:16px;padding:20px}
    .vo-header{display:flex;align-items:center;gap:10px}
    .vo-title{font-family:'Orbitron',sans-serif;font-size:18px;color:#fff;margin:0}
    .vo-list{display:flex;flex-direction:column;gap:10px}
    .vo-card{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.12);border-radius:10px;padding:14px 16px}
    .vo-icon{font-size:32px;flex-shrink:0}
    .vo-info{flex:1}
    .vo-name{font-family:'Orbitron',sans-serif;font-size:13px;color:#fff}
    .vo-members{font-size:11px;color:#7a9bbf;margin-top:2px}
    .vo-desc{font-size:12px;color:#a8bfd8;margin-top:4px}
    .vo-join{background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:8px 14px;cursor:pointer;flex-shrink:0;white-space:nowrap}
    .vo-footer{display:flex;justify-content:flex-end}
    .vo-btn{background:transparent;border:1px solid rgba(0,200,255,.3);border-radius:8px;color:#00c8ff;font-family:'Orbitron',sans-serif;font-size:11px;font-weight:700;padding:9px 22px;cursor:pointer}
  `]
})
export class ViewOrganizationsComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  organizations = signal([
    { id:1, icon:'🌿', name:'SEEDS Collective', members:2840, description:'Regenerative economics community.', joined:true },
    { id:2, icon:'🌐', name:'OASIS Builders', members:1520, description:'Open source development collective.', joined:false },
    { id:3, icon:'💡', name:'Innovation DAO', members:890, description:'Funding breakthrough ideas in the OASIS.', joined:false },
    { id:4, icon:'🎨', name:'Creative Guild', members:340, description:'NFT artists and digital creators.', joined:true },
  ]);
  join(id: number) {
    this.organizations.update(list => list.map(o => o.id === id ? { ...o, joined: !o.joined } : o));
  }
}
