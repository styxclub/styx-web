import { Component, input, InputSignal } from '@angular/core';
import Message from '@model/message.model';

@Component({
  selector: 'app-message-item',
  imports: [],
  templateUrl: './message-item.html',
  styleUrl: './message-item.scss',
})
export default class MessageItem {
  message: InputSignal<Message> = input.required<Message>();
}
