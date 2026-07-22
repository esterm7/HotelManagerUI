import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';
import { map } from 'rxjs/operators';

import { AuthService } from '../services/AuthService';
import { UtenteLogin } from '../../features/utente-login/utente-login';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const dialog = inject(Dialog);

  if (authService.isLoggedIn()) {
    return true;
  }

  const dialogRef = dialog.open(UtenteLogin, {
    panelClass: 'login-dialog-panel'
  });

  return dialogRef.closed.pipe(
    map(() => {
      return authService.isLoggedIn()
        ? true
        : router.createUrlTree(['/']);
    })
  );
  


};