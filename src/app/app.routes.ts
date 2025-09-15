import { Routes } from '@angular/router';
//import AuthGuard from '@guard/auth-guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/login-page/login-page').then((m) => m.default),
  },
  {
    path: 'styx',
    //canActivate: [AuthGuard],
    loadComponent: () => import('@layout/shell-layout/shell-layout').then((m) => m.default),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadComponent: () => import('@pages/home-page/home-page').then((m) => m.default),
      },
      {
        path: 'events',
        loadComponent: () => import('@pages/events-page/events-page').then((m) => m.default),
      },
      {
        path: 'chat',
        loadComponent: () => import('@pages/chat-page/chat-page').then((m) => m.default),
      },
      {
        path: 'profile',
        loadComponent: () => import('@pages/profile-page/profile-page').then((m) => m.default),
      },
    ],
  },
  { path: '**', redirectTo: '/' },
];

export default routes;
