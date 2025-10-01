import {
  Component,
  computed,
  inject,
  OnDestroy,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import AuthStore from '@app/auth/auth-store';
import Parameter from '@model/parameter.model';
import DialogAlertService from '@services/dialog-alert-service';
import EventParameterAdd from '@shared/event-parameter-add/event-parameter-add';
import ParameterAdd from '@shared/parameter-add/parameter-add';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { RippleModule } from 'primeng/ripple';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-event-new-page',
  imports: [
    ParameterAdd,
    InputTextModule,
    TextareaModule,
    FloatLabel,
    MessageModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RippleModule,
    RouterLink,
  ],
  templateUrl: './event-new-page.html',
  styleUrl: './event-new-page.scss',
})
export default class EventNewPage implements OnDestroy {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly dialogService: DialogService = inject(DialogService);
  private readonly dialogAlertService: DialogAlertService = inject(DialogAlertService);
  private readonly authStore: AuthStore = inject(AuthStore);

  form = this.fb.group({
    title: this.fb.control<string>('', {
      validators: [Validators.required],
    }),
    body: this.fb.control<string>('', {
      validators: [Validators.required],
    }),
  });
  refParameter: DynamicDialogRef | null = null;
  submitting: WritableSignal<boolean> = signal(false);
  parameters: WritableSignal<Parameter[]> = signal<Parameter[]>([]);
  credits: Signal<number> = computed(() => {
    return this.parameters().reduce((total, param) => {
      return total + (param.num ?? 0) * (param.cost ?? 0);
    }, 0);
  });

  title = () => this.form.get('title');
  body = () => this.form.get('body');

  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control.touched || this.submitting());
  }

  addParameter(): void {
    this.refParameter = this.dialogService.open(EventParameterAdd, {
      header: 'Añadir parámetro',
      width: '75vw',
      modal: true,
      closable: true,
      focusOnShow: false,
    });
    this.refParameter?.onClose.subscribe((result: Parameter | undefined): void => {
      console.log(result);
      if (result !== undefined) {
        this.parameters.update((params: Parameter[]): Parameter[] => [...params, result]);
      }
    });
  }

  updateParameterText(index: number, newText: string): void {
    this.parameters.update((params: Parameter[]): Parameter[] =>
      params.map(
        (p: Parameter, i: number): Parameter => (i === index ? p.cloneWithText(newText) : p)
      )
    );
  }

  updateParameterNum(index: number, newNum: number): void {
    this.parameters.update((params: Parameter[]): Parameter[] =>
      params.map((p: Parameter, i: number): Parameter => (i === index ? p.cloneWithNum(newNum) : p))
    );
  }

  updateParameterDate(index: number, newDate: Date): void {
    this.parameters.update((params: Parameter[]): Parameter[] =>
      params.map(
        (p: Parameter, i: number): Parameter => (i === index ? p.cloneWithDate(newDate) : p)
      )
    );
  }

  updateParameterChecked(index: number, newChecked: boolean): void {
    this.parameters.update((params: Parameter[]): Parameter[] =>
      params.map(
        (p: Parameter, i: number): Parameter => (i === index ? p.cloneWithChecked(newChecked) : p)
      )
    );
  }

  removeParameter(ind: number): void {
    this.parameters.update((params: Parameter[]): Parameter[] =>
      params.filter((_: Parameter, i: number): boolean => i !== ind)
    );
  }

  async onSubmit(): Promise<void> {
    const result: boolean = await this.dialogAlertService.confirm(
      'Error',
      'No tienes suficientes créditos.'
    );
    console.log(result);
  }

  ngOnDestroy(): void {
    if (this.refParameter) {
      this.refParameter.close();
    }
  }
}
