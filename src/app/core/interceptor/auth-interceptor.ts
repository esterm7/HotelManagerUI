import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';

import { AuthService } from '../../services/AuthService';
import { AlertService } from '../../services/AlertService';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const alertService = inject(AlertService);

  const router = inject(Router);

  const token = authService.getToken();




  const authReq = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {
        alertService.show('Sessione scaduta. Effettua nuovamente il login.');

        authService.logout();

        router.navigate(['/login']);
      }

      if (error.status === 403) {
        alertService.show('Non hai i permessi per eseguire questa operazione.');
      }

      return throwError(() => error);
    })
  );
}
