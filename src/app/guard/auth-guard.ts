import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import AuthStore from '@auth/auth-store';

const AuthGuard: CanActivateFn = (): boolean => {
  const store: AuthStore = inject(AuthStore);
  const router = inject(Router);

  console.log('en auth guard');
  if (store.isAuthenticated()) {
    console.log('is authenticated');
    return true;
  }
  console.log('not authenticated, redirecting to /');
  router.navigateByUrl('/');
  return false;
};

export default AuthGuard;
