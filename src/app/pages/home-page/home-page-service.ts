import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import AuthStore from '@auth/auth-store';
import { environment } from '@env/environment';
import {
  BoardItem,
  BoardResponse,
  MessagePayload,
  MessagesResponse,
  RequestPayload,
  RequestsResponse,
} from '@interfaces/home.interfaces';
import Chat from '@model/chat.model';
import Message from '@model/message.model';
import Request from '@model/request.model';
import ClassMapperService from '@services/class-mapper-service';
import { MenuItem } from 'primeng/api';
import { firstValueFrom } from 'rxjs';

@Injectable()
export default class HomePageService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly authStore: AuthStore = inject(AuthStore);
  private readonly classMapperService: ClassMapperService = inject(ClassMapperService);
  private readonly apiUrl: string = environment.apiUrl;

  _username: WritableSignal<string | undefined> = signal<string | undefined>(
    this.authStore.user()?.username
  );
  get username(): string | undefined {
    return this._username();
  }
  _reputation: WritableSignal<number | undefined> = signal<number | undefined>(
    this.authStore.user()?.reputation
  );
  get reputation(): number | undefined {
    return this._reputation();
  }
  _votes: WritableSignal<number | undefined> = signal<number | undefined>(
    this.authStore.user()?.votes
  );
  get votes(): number | undefined {
    return this._votes();
  }
  _bio: WritableSignal<string | null | undefined> = signal<string | null | undefined>(
    this.authStore.user()?.bio
  );
  get bio(): string | null | undefined {
    return this._bio();
  }

  _chats: WritableSignal<Chat[]> = signal<Chat[]>([]);
  get chats(): Chat[] {
    return this._chats();
  }
  _boardItems: WritableSignal<(Message | Request)[]> = signal<(Message | Request)[]>([]);
  get boardItems(): (Message | Request)[] {
    return this._boardItems();
  }

  items: MenuItem[] = [];
  private onLoadHome!: () => void;
  private onLoadMessages!: () => void;
  private onLoadRequests!: () => void;

  setMenuCommands(commands: {
    onLoadHome: () => void;
    onLoadMessages: () => void;
    onLoadRequests: () => void;
  }): void {
    this.onLoadHome = commands.onLoadHome;
    this.onLoadMessages = commands.onLoadMessages;
    this.onLoadRequests = commands.onLoadRequests;

    this.items = [
      {
        label: 'Filtrar',
        items: [
          {
            label: 'Todos',
            icon: 'pi pi-book',
            command: (): void => this.onLoadHome(),
          },
          {
            label: 'Noticias',
            icon: 'pi pi-sparkles',
            command: (): void => this.onLoadMessages(),
          },
          {
            label: 'Eventos',
            icon: 'pi pi-calendar',
            command: (): void => this.onLoadRequests(),
          },
        ],
      },
    ];
  }

  async getHome(page: number = 0, limit: number = 20): Promise<BoardResponse> {
    const url = `${this.apiUrl}/home/get-home`;
    return await firstValueFrom(this.http.post<BoardResponse>(url, { page, limit }));
  }

  async loadHome(): Promise<void> {
    const response: BoardResponse = await this.getHome();
    if (response.chats.length > 0) {
      this._chats.set(this.classMapperService.getChats(response.chats));
    }
    const items: (Message | Request)[] = response.board.map((it: BoardItem): Message | Request => {
      if (it.kind === 'message') {
        return new Message().fromInterface(it.payload as MessagePayload);
      } else {
        return new Request().fromInterface(it.payload as RequestPayload);
      }
    });
    this._boardItems.set(items);
  }

  async getMessages(page: number = 0, limit: number = 20): Promise<MessagesResponse> {
    const url = `${this.apiUrl}/home/get-messages`;
    return await firstValueFrom(this.http.post<MessagesResponse>(url, { page, limit }));
  }

  async loadMessages(page: number = 0, limit: number = 20): Promise<void> {
    const response: MessagesResponse = await this.getMessages(page, limit);
    if (response.messages.length > 0) {
      this._boardItems.set(
        response.messages.map(
          (m: BoardItem): Message => new Message().fromInterface(m.payload as MessagePayload)
        )
      );
      console.log(this._boardItems());
    }
  }

  async getRequests(page: number = 0, limit: number = 20): Promise<RequestsResponse> {
    const url = `${this.apiUrl}/home/get-requests`;
    return await firstValueFrom(this.http.post<RequestsResponse>(url, { page, limit }));
  }

  async loadRequests(page: number = 0, limit: number = 20): Promise<void> {
    const response: RequestsResponse = await this.getRequests(page, limit);
    if (response.requests.length > 0) {
      this._boardItems.set(
        response.requests.map(
          (m: BoardItem): Request => new Request().fromInterface(m.payload as RequestPayload)
        )
      );
    }
  }

  isMessage(item: Message | Request): item is Message {
    return (item as any).kind === 'message';
  }

  isRequest(item: Message | Request): item is Request {
    return (item as any).kind === 'request';
  }
}
