import {
  Component,
  input,
  InputSignal,
  model,
  ModelSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import Parameter from '@model/parameter.model';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-parameter-add',
  imports: [FormsModule, InputTextModule, DatePickerModule, FluidModule, CheckboxModule],
  templateUrl: './parameter-add.html',
  styleUrl: './parameter-add.scss',
})
export default class ParameterAdd {
  parameter: ModelSignal<Parameter> = model.required<Parameter>();
  ind: InputSignal<number> = input.required<number>();
  removed: OutputEmitterRef<number> = output<number>();
  textChanged: OutputEmitterRef<string> = output<string>();
  numChanged: OutputEmitterRef<number> = output<number>();
  dateChanged: OutputEmitterRef<Date> = output<Date>();
  checkedChanged: OutputEmitterRef<boolean> = output<boolean>();

  onTextChange(value: string): void {
    this.textChanged.emit(value);
  }

  onNumChange(value: number): void {
    this.numChanged.emit(value);
  }

  onDateChange(value: Date): void {
    this.dateChanged.emit(value);
  }

  onCheckedChange(value: boolean): void {
    this.checkedChanged.emit(value);
  }

  removeParameter(ev: MouseEvent): void {
    ev.preventDefault();
    this.removed.emit(this.ind());
  }
}
