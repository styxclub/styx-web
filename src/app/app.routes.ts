import { Routes } from '@angular/router';
import AuthGuard from '@guard/auth-guard';
import ChatPageService from '@pages/chat-page/chat-page-service';
import HomePageService from '@pages/home-page/home-page-service';
import ProfilePageService from '@pages/profile-page/profile-page-service';
import { isDesktopMatch, isHandsetMatch } from '@shared/matchers';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/login-page/login-page').then((m) => m.default),
  },
  {
    path: 'styx',
    canActivate: [AuthGuard],
    loadComponent: () => import('@layout/shell-layout/shell-layout').then((m) => m.default),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        canMatch: [isDesktopMatch],
        providers: [HomePageService],
        loadComponent: () =>
          import('@pages/home-page/home-page-desktop/home-page-desktop').then((m) => m.default),
      },
      {
        path: 'home',
        canMatch: [isHandsetMatch],
        providers: [HomePageService],
        loadComponent: () =>
          import('@pages/home-page/home-page-mobile/home-page-mobile').then((m) => m.default),
      },
      {
        path: 'events',
        loadComponent: () => import('@pages/events-page/events-page').then((m) => m.default),
      },
      {
        path: 'event-new',
        loadComponent: () => import('@pages/event-new-page/event-new-page').then((m) => m.default),
      },
      {
        path: 'chat',
        canMatch: [isDesktopMatch],
        providers: [ChatPageService],
        loadComponent: () =>
          import('@pages/chat-page/chat-page-desktop/chat-page-desktop').then((m) => m.default),
      },
      {
        path: 'chat',
        canMatch: [isHandsetMatch],
        providers: [ChatPageService],
        loadComponent: () =>
          import('@pages/chat-page/chat-page-mobile/chat-page-mobile').then((m) => m.default),
      },
      {
        path: 'profile',
        canMatch: [isDesktopMatch],
        providers: [ProfilePageService],
        loadComponent: () =>
          import('@pages/profile-page/profile-page-desktop/profile-page-desktop').then(
            (m) => m.default
          ),
      },
      {
        path: 'profile',
        canMatch: [isHandsetMatch],
        providers: [ProfilePageService],
        loadComponent: () =>
          import('@pages/profile-page/profile-page-mobile/profile-page-mobile').then(
            (m) => m.default
          ),
      },
    ],
  },
  { path: '**', redirectTo: '/' },
];

export default routes;
