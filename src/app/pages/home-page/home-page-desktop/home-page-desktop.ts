import {
  Component,
  ComponentRef,
  inject,
  OnInit,
  signal,
  viewChild,
  ViewContainerRef,
  WritableSignal,
} from '@angular/core';
import PopupParameter from '@app/shared/popup-parameter/popup-parameter';
import Chat from '@model/chat.model';
import Message from '@model/message.model';
import Request from '@model/request.model';
import HomePageService from '@pages/home-page/home-page-service';
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
    PopupParameter,
    ButtonModule,
    Tooltip,
    MenuModule,
  ],
  templateUrl: './home-page-desktop.html',
  styleUrl: './home-page-desktop.scss',
})
export default class HomePageDesktop implements OnInit {
  private homePageService: HomePageService = inject(HomePageService);

  username: string | undefined = this.homePageService.username;
  reputation: number | undefined = this.homePageService.reputation;
  votes: number | undefined = this.homePageService.votes;
  bio: string | null | undefined = this.homePageService.bio;
  chats: WritableSignal<Chat[]> = signal<Chat[]>([]);
  boardItems: WritableSignal<(Message | Request)[]> = signal<(Message | Request)[]>([]);

  items: MenuItem[] = this.homePageService.items;

  private readonly container = viewChild(ViewContainerRef);
  private parameterRef: ComponentRef<PopupParameter> | null = null;

  async ngOnInit(): Promise<void> {
    await this.homePageService.loadHome();
    this.chats.set(this.homePageService.chats);
    this.boardItems.set(this.homePageService.boardItems);
  }

  isMessage(item: Message | Request): item is Message {
    return this.homePageService.isMessage(item);
  }

  isRequest(item: Message | Request): item is Request {
    return this.homePageService.isRequest(item);
  }

  showTooltip(event: MouseEvent, name: string): void {
    this.container()?.clear();
    this.parameterRef = this.container().createComponent(PopupParameter);
    this.parameterRef.instance.title.set(name);
    this.updatePosition(event);
  }

  moveTooltip(event: MouseEvent): void {
    if (this.parameterRef) {
      this.updatePosition(event);
    }
  }

  hideTooltip(): void {
    this.container()?.clear();
    this.parameterRef = null;
  }

  private updatePosition(event: MouseEvent): void {
    const position = { x: event.clientX + 10, y: event.clientY + 10 };
    this.parameterRef?.instance.position.set(position);
  }
}
