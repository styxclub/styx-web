import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import Chat from '@model/chat.model';
import UserPhoto from '@shared/user-photo/user-photo';

@Component({
  selector: 'app-user-message',
  imports: [UserPhoto, RouterLink],
  templateUrl: './user-message.html',
  styleUrl: './user-message.scss',
})
export default class UserMessage {
  chat: InputSignal<Chat> = input.required<Chat>();
}
