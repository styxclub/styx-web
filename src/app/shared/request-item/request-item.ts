import { Component, input, InputSignal } from '@angular/core';
import Request from '@model/request.model';

@Component({
  selector: 'app-request-item',
  imports: [],
  templateUrl: './request-item.html',
  styleUrl: './request-item.scss',
})
export default class RequestItem {
  request: InputSignal<Request> = input.required<Request>();
}
