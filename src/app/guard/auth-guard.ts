import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import AuthStore from '@auth/auth-store';

const AuthGuard: CanActivateFn = (): boolean => {
  const store: AuthStore = inject(AuthStore);
  const router = inject(Router);

  if (store.isAuthenticated()) {
    return true;
  }
  router.navigateByUrl('/');
  return false;
};

export default AuthGuard;
