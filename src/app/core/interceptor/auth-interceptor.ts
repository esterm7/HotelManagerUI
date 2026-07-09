import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';

import { AuthService } from '../services/AuthService';
import { AlertService } from '../services/AlertService';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { SKIP_GLOBAL_ERROR_ALERT } from '../tokens/http-context.tokens';

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
      // TODO: se l'errore viene gestito da un altra parte questo non deve subentrare

      const skipAlert = req.context.get(SKIP_GLOBAL_ERROR_ALERT);


      if (error.status === 401 && !skipAlert) {
        alertService.show('Sessione scaduta. Effettua nuovamente il login.');

        authService.logout();

        router.navigate(['/login']);
      }

      if (error.status === 403 && !skipAlert) {
        alertService.show('Non hai i permessi per eseguire questa operazione.');
      }

      if (error.status === 500 && !skipAlert) {
        alertService.show('Pagina non raggiungibile');
      }


      return throwError(() => error);
    })
  );
}
