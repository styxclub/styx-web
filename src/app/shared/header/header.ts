import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import AuthStore from '@auth/auth-store';
import AuthService from '@services/auth-service';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, TooltipModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export default class Header {
  private readonly authService: AuthService = inject(AuthService);
  private readonly authStore: AuthStore = inject(AuthStore);
  private readonly router: Router = inject(Router);

  credits: WritableSignal<number | undefined> = signal<number | undefined>(
    this.authStore.user()?.credits
  );

  logout(): void {
    const refreshToken: string | null = this.authStore.refreshToken();
    if (refreshToken !== null) {
      this.authService.logout(refreshToken).then((): void => {
        this.authStore.clear();
        this.router.navigateByUrl('/');
      });
    }
  }
}
