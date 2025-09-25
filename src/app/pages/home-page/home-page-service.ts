import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import AuthStore from '@auth/auth-store';
import { environment } from '@env/environment';
import { BoardResponse } from '@interfaces/home.interfaces';
import Chat from '@model/chat.model';
import Message from '@model/message.model';
import Request from '@model/request.model';
import ClassMapperService from '@services/class-mapper-service';
import { MenuItem } from 'primeng/api';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class HomePageService {
  private http: HttpClient = inject(HttpClient);
  private authStore: AuthStore = inject(AuthStore);
  private classMapperService: ClassMapperService = inject(ClassMapperService);
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

  items: MenuItem[] = [
    {
      label: 'Filtrar',
      items: [
        {
          label: 'Todos',
          icon: 'pi pi-book',
        },
        {
          label: 'Noticias',
          icon: 'pi pi-sparkles',
        },
        {
          label: 'Eventos',
          icon: 'pi pi-calendar',
        },
      ],
    },
  ];

  async getHome(page: number = 0, limit: number = 20): Promise<BoardResponse> {
    const url = `${this.apiUrl}/home/get-home`;
    return await firstValueFrom(this.http.post<BoardResponse>(url, { page, limit }));
  }

  async loadHome(): Promise<void> {
    const response: BoardResponse = await this.getHome();
    if (response.chats.length > 0) {
      this._chats.set(this.classMapperService.getChats(response.chats));
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
    this._boardItems.set(items);
  }

  isMessage(item: Message | Request): item is Message {
    return (item as any).kind === 'message';
  }

  isRequest(item: Message | Request): item is Request {
    return (item as any).kind === 'request';
  }
}
