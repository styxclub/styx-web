import { Injectable, inject } from '@angular/core';
import CustomDialog from '@shared/custom-dialog/custom-dialog';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({ providedIn: 'root' })
export default class DialogAlertService {
  private dialogService = inject(DialogService);

  alert(title: string, message: string): Promise<void> {
    return new Promise((resolve) => {
      const ref: DynamicDialogRef<CustomDialog> | null = this.dialogService.open(CustomDialog, {
        header: title,
        data: {
          message,
          showConfirm: false,
        },
        closable: false,
        closeOnEscape: false,
        modal: true,
        width: '350px',
      });

      if (ref !== null) {
        ref.onClose.subscribe((): void => resolve());
      }
    });
  }

  confirm(title: string, message: string): Promise<boolean> {
    return new Promise((resolve) => {
      const ref: DynamicDialogRef<CustomDialog> | null = this.dialogService.open(CustomDialog, {
        header: title,
        data: {
          message,
          showConfirm: true,
        },
        closable: false,
        closeOnEscape: false,
        modal: true,
        width: '350px',
      });

      if (ref !== null) {
        ref.onClose.subscribe((result: boolean): void => {
          resolve(result);
        });
      }
    });
  }
}
