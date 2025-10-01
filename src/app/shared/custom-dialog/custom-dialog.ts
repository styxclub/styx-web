import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-custom-dialog',
  imports: [RippleModule, ButtonModule],
  templateUrl: './custom-dialog.html',
  styleUrl: './custom-dialog.scss',
})
export default class CustomDialog {
  public readonly ref: DynamicDialogRef = inject(DynamicDialogRef);
  private readonly config: DynamicDialogConfig = inject(DynamicDialogConfig);

  message: WritableSignal<string> = signal<string>(this.config.data['message']);
  showConfirm: WritableSignal<boolean> = signal<boolean>(this.config.data['showConfirm']);
}
