import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-state-block',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="state-block" [class.state-block--error]="kind === 'error'">
      <div class="spinner" *ngIf="kind === 'loading'" aria-hidden="true"></div>
      <p>{{ message }}</p>
      <button class="retry-btn" *ngIf="kind === 'error'" type="button" (click)="retry.emit()">
        Try again
      </button>
    </div>
  `,
})
export class StateBlockComponent {
  @Input() kind: 'loading' | 'error' = 'loading';
  @Input() message = '';
  @Output() retry = new EventEmitter<void>();
}
