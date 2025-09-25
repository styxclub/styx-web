import { Component, input, InputSignal } from '@angular/core';
import { PositionInterface } from '@interfaces/interfaces';

@Component({
  selector: 'app-popup-parameter',
  imports: [],
  templateUrl: './popup-parameter.html',
  styleUrl: './popup-parameter.scss',
})
export default class PopupParameter {
  readonly title: InputSignal<string> = input.required<string>();
  readonly body: InputSignal<string> = input.required<string>();
  readonly position: InputSignal<PositionInterface> = input.required<PositionInterface>();
}
