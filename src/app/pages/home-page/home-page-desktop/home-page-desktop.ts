import { Component, inject, signal, WritableSignal } from '@angular/core';
import AuthStore from '@app/auth/auth-store';
import UserPhoto from '@shared/user-photo/user-photo';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home-page-desktop',
  imports: [UserPhoto, ButtonModule],
  templateUrl: './home-page-desktop.html',
  styleUrl: './home-page-desktop.scss',
})
export default class HomePageDesktop {
  private authStore: AuthStore = inject(AuthStore);

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
}
