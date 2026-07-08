import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'oasis-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="sett-shell">
      <div class="sett-header"><h2 class="sett-title">⚙️ Settings</h2><p class="sett-sub">Manage your OASIS account and preferences.</p></div>
      <div class="sett-sections">
        @for (sec of sections; track sec.label) {
          <div class="sett-section" [class.sett-section--open]="openSection() === sec.label" (click)="openSection.set(openSection() === sec.label ? '' : sec.label)">
            <div class="sett-section-header">
              <span class="sett-section-icon">{{ sec.icon }}</span>
              <span class="sett-section-label">{{ sec.label }}</span>
              <span class="sett-chevron">{{ openSection() === sec.label ? '▲' : '▼' }}</span>
            </div>
            @if (openSection() === sec.label) {
              <div class="sett-section-body">
                @for (opt of sec.options; track opt.key) {
                  <div class="sett-opt">
                    <div class="sett-opt-info"><div class="sett-opt-name">{{ opt.name }}</div><div class="sett-opt-desc">{{ opt.desc }}</div></div>
                    @if (opt.type === 'toggle') {
                      <div class="sett-toggle" [class.sett-toggle--on]="prefs[opt.key]" (click)="prefs[opt.key] = !prefs[opt.key]">
                        <div class="sett-toggle-knob"></div>
                      </div>
                    }
                    @if (opt.type === 'select') {
                      <select class="sett-select" [(ngModel)]="prefs[opt.key]">
                        @for (c of opt.choices; track c) { <option [value]="c">{{ c }}</option> }
                      </select>
                    }
                  </div>
                }
              </div>
            }
          </div>
        }
      </div>
      <button class="oasis-btn" (click)="save()">{{ saved() ? '✅ Saved!' : 'Save Settings' }}</button>
    </div>
  `,
  styles: [`
    .sett-shell{display:flex;flex-direction:column;gap:18px}
    .sett-header{text-align:center}
    .sett-title{font-family:'Orbitron',sans-serif;font-size:20px;color:#fff;margin:0 0 6px}
    .sett-sub{font-size:13px;color:#7a9bbf;margin:0}
    .sett-sections{display:flex;flex-direction:column;gap:8px}
    .sett-section{background:rgba(255,255,255,.04);border:1px solid rgba(0,200,255,.12);border-radius:10px;overflow:hidden;transition:border-color .2s}
    .sett-section--open{border-color:rgba(0,200,255,.3)}
    .sett-section-header{display:flex;align-items:center;gap:10px;padding:14px 16px;cursor:pointer;user-select:none}
    .sett-section-icon{font-size:18px}
    .sett-section-label{flex:1;font-family:'Orbitron',sans-serif;font-size:13px;color:#fff}
    .sett-chevron{font-size:10px;color:#7a9bbf}
    .sett-section-body{padding:0 16px 16px;display:flex;flex-direction:column;gap:14px}
    .sett-opt{display:flex;align-items:center;gap:14px}
    .sett-opt-info{flex:1}
    .sett-opt-name{font-size:13px;color:#e0f0ff}
    .sett-opt-desc{font-size:11px;color:#4a6a88;margin-top:2px}
    .sett-toggle{width:44px;height:24px;border-radius:999px;background:rgba(255,255,255,.1);cursor:pointer;transition:background .2s;position:relative;flex-shrink:0}
    .sett-toggle--on{background:linear-gradient(135deg,#00c8ff,#0080ff)}
    .sett-toggle-knob{position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:transform .2s}
    .sett-toggle--on .sett-toggle-knob{transform:translateX(20px)}
    .sett-select{background:rgba(255,255,255,.05);border:1px solid rgba(0,200,255,.2);border-radius:7px;color:#fff;font-size:12px;padding:6px 10px;outline:none}
    .oasis-btn{background:linear-gradient(135deg,#00c8ff,#0080ff);border:none;border-radius:8px;color:#fff;font-family:'Orbitron',sans-serif;font-size:13px;font-weight:700;letter-spacing:.08em;padding:12px;cursor:pointer;transition:opacity .2s}
  `]
})
export class SettingsComponent {
  openSection = signal('');
  saved = signal(false);
  prefs: Record<string, any> = {
    notifications: true, darkMode: true, sound: false, autoSave: true,
    language: 'English', theme: 'Dark Space', currency: 'ETH'
  };
  sections = [
    { icon: '🔔', label: 'Notifications', options: [
      { key: 'notifications', name: 'Enable Notifications', desc: 'Receive alerts for karma, messages and quests.', type: 'toggle' },
      { key: 'sound', name: 'Sound Effects', desc: 'Play sounds for OASIS events.', type: 'toggle' },
    ]},
    { icon: '🎨', label: 'Appearance', options: [
      { key: 'darkMode', name: 'Dark Mode', desc: 'Use the dark space theme.', type: 'toggle' },
      { key: 'theme', name: 'Theme', desc: 'Select your OASIS visual theme.', type: 'select', choices: ['Dark Space', 'Neon City', 'Forest Realm'] },
    ]},
    { icon: '🌐', label: 'Language & Region', options: [
      { key: 'language', name: 'Language', desc: 'Select your preferred language.', type: 'select', choices: ['English', 'Spanish', 'French', 'German', 'Japanese'] },
      { key: 'currency', name: 'Display Currency', desc: 'Currency for prices and values.', type: 'select', choices: ['ETH', 'SOL', 'USD', 'GBP', 'EUR'] },
    ]},
    { icon: '💾', label: 'Data', options: [
      { key: 'autoSave', name: 'Auto-save Progress', desc: 'Automatically save your OASIS progress.', type: 'toggle' },
    ]},
  ];

  save() { this.saved.set(true); setTimeout(() => this.saved.set(false), 2000); }
}
