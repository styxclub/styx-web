import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import AuthStore from '@auth/auth-store';
import AuthService from '@services/auth-service';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, RippleModule, TooltipModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export default class Header {
  private readonly authService: AuthService = inject(AuthService);
  public readonly authStore: AuthStore = inject(AuthStore);
  private readonly router: Router = inject(Router);

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
