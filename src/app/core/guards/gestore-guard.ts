import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/AuthService';

export const gestoreGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isGestore()) {
    console.log("gestore");
    return true;
  }

  return router.createUrlTree(['/']);
};