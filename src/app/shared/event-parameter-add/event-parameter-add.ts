import { Component, inject, signal, WritableSignal } from '@angular/core';
import AuthStore from '@auth/auth-store';
import ICON_SIZES from '@interfaces/icon-sizes.enum';
import Parameter from '@model/parameter.model';
import { AngleDown } from '@primeicons/angular/angle-down';
import { AngleUp } from '@primeicons/angular/angle-up';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-event-parameter-add',
  imports: [ButtonModule, AngleUp, AngleDown],
  templateUrl: './event-parameter-add.html',
  styleUrl: './event-parameter-add.scss',
})
export default class EventParameterAdd {
  private readonly authStore: AuthStore = inject(AuthStore);
  private readonly ref: DynamicDialogRef = inject(DynamicDialogRef);
  readonly ICON_SIZES = ICON_SIZES;

  parameters: WritableSignal<Parameter[]> = signal<Parameter[]>(this.authStore.parameters());

  selectParameter(ev: MouseEvent, parameter: Parameter): void {
    ev.preventDefault();
    this.ref.close(parameter);
  }

  show(parameter: Parameter): void {
    parameter.show = !parameter.show;
  }
}
