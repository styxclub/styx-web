import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import routes from '@app/app.routes';
import provideCore from '@app/core';
import styxPreset from '@app/styx-preset';
import AuthStore from '@auth/auth-store';
import AuthInterceptor from '@interceptors/auth-interceptor';
import { es } from 'primelocale/es.json';
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
    providePrimeNG({
      translation: es,
      ripple: true,
      theme: {
        preset: styxPreset,
        options: {
          darkModeSelector: '.styx-app-dark',
        },
      },
    }),
    provideCore(),
  ],
};

export default appConfig;
