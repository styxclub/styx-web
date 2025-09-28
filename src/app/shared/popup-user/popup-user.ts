import { Component, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';
import User from '@model/user.model';
import AuthService from '@services/auth-service';
import ClassMapperService from '@services/class-mapper-service';
import UserCacheService from '@services/user-cache-service';
import UserPhoto from '@shared/user-photo/user-photo';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-popup-user',
  imports: [UserPhoto],
  templateUrl: './popup-user.html',
  styleUrl: './popup-user.scss',
})
export default class PopupUser {
  private readonly authService: AuthService = inject(AuthService);
  private readonly classMapperService: ClassMapperService = inject(ClassMapperService);
  private readonly userCacheService: UserCacheService = inject(UserCacheService);
  private readonly config: DynamicDialogConfig = inject(DynamicDialogConfig);

  id: InputSignal<number | null> = input<number | null>(null);
  user: WritableSignal<User | null> = signal<User | null>(null);
  idUser: WritableSignal<number> = signal<number>(-1);
  isMobile: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit(): void {
    const id: number | null = this.id();
    if (id !== null) {
      this.loadUser(id);
    }
    if (this.config && this.config.data) {
      this.isMobile.set(true);
      const idUser: number | undefined = this.config.data['id'];
      if (idUser) {
        this.loadUser(idUser);
      }
    }
  }

  async loadUser(id: number): Promise<void> {
    this.idUser.set(id);
    const cachedUser: User | undefined = this.userCacheService.getUser(id);
    if (cachedUser) {
      this.user.set(cachedUser);
      return;
    }
    const userResponse = await this.authService.getUserInfo(id);
    if (userResponse.status === 'ok') {
      const newUser: User = this.classMapperService.getUser(userResponse.user);
      this.user.set(newUser);
      this.userCacheService.addUser(newUser);
    }
  }
}
