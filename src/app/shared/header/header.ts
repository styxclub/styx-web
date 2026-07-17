import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import AuthStore from '@auth/auth-store';
import ICON_SIZES from '@interfaces/icon-sizes.enum';
import { Dollar } from '@primeicons/angular/dollar';
import { PowerOff } from '@primeicons/angular/power-off';
import AuthService from '@services/auth-service';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, TooltipModule, Dollar, PowerOff],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export default class Header {
  private readonly authService: AuthService = inject(AuthService);
  public readonly authStore: AuthStore = inject(AuthStore);
  private readonly router: Router = inject(Router);
  readonly ICON_SIZES = ICON_SIZES;

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
