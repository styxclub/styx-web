import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import AuthStore from '@auth/auth-store';
import { BoardResponse } from '@interfaces/home.interfaces';
import Chat from '@model/chat.model';
import Message from '@model/message.model';
import Request from '@model/request.model';
import HomePageService from '@pages/home-page/home-page-service';
import ClassMapperService from '@services/class-mapper-service';
import MessageItem from '@shared/message-item/message-item';
import RequestItem from '@shared/request-item/request-item';
import UserMessage from '@shared/user-message/user-message';
import UserPhoto from '@shared/user-photo/user-photo';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-home-page-desktop',
  imports: [UserPhoto, UserMessage, MessageItem, RequestItem, ButtonModule, Tooltip, MenuModule],
  templateUrl: './home-page-desktop.html',
  styleUrl: './home-page-desktop.scss',
})
export default class HomePageDesktop implements OnInit {
  private authStore: AuthStore = inject(AuthStore);
  private homePageService: HomePageService = inject(HomePageService);
  private classMapperService: ClassMapperService = inject(ClassMapperService);

  username: WritableSignal<string | undefined> = signal<string | undefined>(
    this.authStore.user()?.username
  );
  reputation: WritableSignal<number | undefined> = signal<number | undefined>(
    this.authStore.user()?.reputation
  );
  votes: WritableSignal<number | undefined> = signal<number | undefined>(
    this.authStore.user()?.votes
  );
  bio: WritableSignal<string | undefined> = signal<string | undefined>(this.authStore.user()?.bio);
  chats: WritableSignal<Chat[]> = signal<Chat[]>([]);
  boardItems: WritableSignal<(Message | Request)[]> = signal<(Message | Request)[]>([]);

  items: MenuItem[] = [
    {
      label: 'Options',
      items: [
        {
          label: 'Refresh',
          icon: 'pi pi-refresh',
        },
        {
          label: 'Export',
          icon: 'pi pi-upload',
        },
      ],
    },
  ];

  async ngOnInit(): Promise<void> {
    const response: BoardResponse = await this.homePageService.getHome();
    if (response.chats.length > 0) {
      this.chats.set(this.classMapperService.getChats(response.chats));
    }
    const items: (Message | Request)[] = response.board.map((it: any): Message | Request => {
      if (it.kind === 'message') {
        const m: Message = new Message().fromInterface(it.payload);
        (m as any).kind = 'message';
        return m;
      } else {
        const r: Request = new Request().fromInterface(it.payload);
        (r as any).kind = 'request';
        return r;
      }
    });
    this.boardItems.set(items);
  }

  isMessage(item: Message | Request): item is Message {
    return (item as any).kind === 'message';
  }
  isRequest(item: Message | Request): item is Request {
    return (item as any).kind === 'request';
  }
}
