import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import AuthStore from '@auth/auth-store';
import { BoardResponse } from '@interfaces/home.interfaces';
import Chat from '@model/chat.model';
import HomePageService from '@pages/home-page/home-page-service';
import ClassMapperService from '@services/class-mapper-service';
import UserMessage from '@shared/user-message/user-message';
import UserPhoto from '@shared/user-photo/user-photo';
import { ButtonModule } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-home-page-desktop',
  imports: [UserPhoto, UserMessage, ButtonModule, Tooltip],
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

  async ngOnInit(): Promise<void> {
    const response: BoardResponse = await this.homePageService.getHome();
    console.log(response);
    if (response.chats.length > 0) {
      this.chats.set(this.classMapperService.getChats(response.chats));
    }
  }
}
