import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import ICON_SIZES from '@interfaces/icon-sizes.enum';
import Chat from '@model/chat.model';
import Message from '@model/message.model';
import Request from '@model/request.model';
import HomePageService from '@pages/home-page/home-page-service';
import { Book } from '@primeicons/angular/book';
import { Calendar } from '@primeicons/angular/calendar';
import { EllipsisV } from '@primeicons/angular/ellipsis-v';
import { Pencil } from '@primeicons/angular/pencil';
import { Sparkles } from '@primeicons/angular/sparkles';
import { Star } from '@primeicons/angular/star';
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
  imports: [
    UserPhoto,
    UserMessage,
    MessageItem,
    RequestItem,
    ButtonModule,
    Tooltip,
    MenuModule,
    Pencil,
    Star,
    EllipsisV,
    Book,
    Sparkles,
    Calendar,
  ],
  templateUrl: './home-page-desktop.html',
  styleUrl: './home-page-desktop.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePageDesktop implements OnInit {
  private readonly homePageService: HomePageService = inject(HomePageService);
  readonly ICON_SIZES = ICON_SIZES;

  username: string | undefined = this.homePageService.username;
  reputation: number | undefined = this.homePageService.reputation;
  votes: number | undefined = this.homePageService.votes;
  bio: string | null | undefined = this.homePageService.bio;
  chats: WritableSignal<Chat[]> = signal<Chat[]>([]);
  boardItems: WritableSignal<(Message | Request)[]> = signal<(Message | Request)[]>([]);

  items: MenuItem[] = this.homePageService.items;

  async ngOnInit(): Promise<void> {
    await this.homePageService.loadHome();
    this.chats.set(this.homePageService.chats);
    this.boardItems.set(this.homePageService.boardItems);

    this.homePageService.setMenuCommands({
      onLoadHome: this.loadHome.bind(this),
      onLoadMessages: this.loadMessages.bind(this),
      onLoadRequests: this.loadRequests.bind(this),
    });
  }

  async loadHome(): Promise<void> {
    await this.homePageService.loadHome();
    this.boardItems.set(this.homePageService.boardItems);
  }

  async loadMessages(): Promise<void> {
    await this.homePageService.loadMessages();
    this.boardItems.set(this.homePageService.boardItems);
  }

  async loadRequests(): Promise<void> {
    await this.homePageService.loadRequests();
    this.boardItems.set(this.homePageService.boardItems);
    console.log(this.boardItems());
  }

  isMessage(item: Message | Request): item is Message {
    return this.homePageService.isMessage(item);
  }

  isRequest(item: Message | Request): item is Request {
    return this.homePageService.isRequest(item);
  }
}
