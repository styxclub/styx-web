import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import routes from '@app/app.routes';
import provideCore from '@app/core';
import AuthStore from '@auth/auth-store';
import AuthInterceptor from '@interceptors/auth-interceptor';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';

const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer((): void => inject(AuthStore).hydrate()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withViewTransitions(),
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.styx-app-dark',
        },
      },
    }),
    provideCore(),
  ],
};

export default appConfig;
