import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'oasis-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (open) {
      <div class="modal-backdrop" (click)="close.emit()">
        <div class="modal-box" [style.border-color]="accentColor" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="close.emit()">✕</button>
          <ng-content />
        </div>
      </div>
    }
  `,
  styles: [`
    .modal-backdrop { position: fixed; inset: 0; z-index: 9000; background: rgba(3,7,20,.85); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 20px; }
    .modal-box { background: #0a1535; border: 1px solid rgba(232,121,249,.25); border-radius: 20px; padding: 40px 36px; max-width: 520px; width: 100%; position: relative; max-height: 90vh; overflow-y: auto; }
    .modal-close { position: absolute; top: 16px; right: 18px; background: none; border: none; color: #a8bfd8; font-size: 20px; cursor: pointer; line-height: 1; }
  `]
})
export class ModalComponent {
  @Input() open = false;
  @Input() accentColor = 'rgba(232,121,249,.25)';
  @Output() close = new EventEmitter<void>();
}
