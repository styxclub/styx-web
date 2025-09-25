import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import Chat from '@model/chat.model';
import PopupUserDirective from '@shared/popup-user/popup-user-directive';
import UserPhoto from '@shared/user-photo/user-photo';

@Component({
  selector: 'app-user-message',
  imports: [UserPhoto, PopupUserDirective, RouterLink],
  templateUrl: './user-message.html',
  styleUrl: './user-message.scss',
})
export default class UserMessage {
  chat: InputSignal<Chat> = input.required<Chat>();
  isMobile: InputSignal<boolean> = input.required<boolean>();
}
