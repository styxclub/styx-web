import { Component, input, InputSignal } from '@angular/core';
import Message from '@model/message.model';
import UserPhoto from '@shared/user-photo/user-photo';

@Component({
  selector: 'app-message-item',
  imports: [UserPhoto],
  templateUrl: './message-item.html',
  styleUrl: './message-item.scss',
})
export default class MessageItem {
  message: InputSignal<Message> = input.required<Message>();
}
