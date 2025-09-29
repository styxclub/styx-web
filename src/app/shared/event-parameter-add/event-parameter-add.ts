import { Component, inject, signal, WritableSignal } from '@angular/core';
import AuthStore from '@auth/auth-store';
import Parameter from '@model/parameter.model';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-event-parameter-add',
  imports: [ButtonModule],
  templateUrl: './event-parameter-add.html',
  styleUrl: './event-parameter-add.scss',
})
export default class EventParameterAdd {
  private readonly authStore: AuthStore = inject(AuthStore);
  private readonly ref: DynamicDialogRef = inject(DynamicDialogRef);

  parameters: WritableSignal<Parameter[]> = signal<Parameter[]>(this.authStore.parameters());

  selectParameter(ev: MouseEvent, parameter: Parameter): void {
    ev.preventDefault();
    this.ref.close(parameter);
  }

  show(parameter: Parameter): void {
    parameter.show = !parameter.show;
  }
}
