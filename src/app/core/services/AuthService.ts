import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Router } from '@angular/router';
import { Observable, tap } from "rxjs";
import { AuthDto } from "../../DTO/authDTO";

import { HttpContext } from '@angular/common/http';
import { SKIP_GLOBAL_ERROR_ALERT } from '../../core/tokens/http-context.tokens';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _currentUser = signal<string | null>(null);


    private TOKEN_KEY = 'token';
    currentUser = this._currentUser.asReadonly();

    constructor(private http: HttpClient, private router: Router) {
        this.restoreSession();
    }

    private restoreSession(): void {
        const token = this.getToken();
        if (!token) return;

        // controlla che il token non sia scaduto prima di fidarti
        if (!this.isTokenValid(token)) {
            this.logout();
            return;
        }

        // ripopola l'utente decodificando il payload del JWT
        const payload = this.decodeToken(token).sub;
        this._currentUser.set(payload);
    }

    private decodeToken(token: string): any {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch {
            return null;
        }
    }

    getCodiceUtente(): string | null {
        const token = this.getToken();
        if (!token) return null;

        if (!this.isTokenValid(token)) {
            return this.decodeToken(token).sub
        }
        return null;
    }

    getLivelloPermessi(): string | null {
        const token = this.getToken();
        if (!token) return null;

        if (this.isTokenValid(token)) {
            return this.decodeToken(token).livelloPermessi
        }
        return null;
    }

    private isTokenValid(token: string): boolean {
        const payload = this.decodeToken(token);
        return !!payload && payload.exp * 1000 > Date.now();
    }

    login(authDTO: AuthDto): Observable<any> {
        return this.http.post('/api/auth/login', authDTO, { context: new HttpContext().set(SKIP_GLOBAL_ERROR_ALERT, true)})
            .pipe(tap((res: any) => {
                console.log('dentro pipe: ' + res.token);
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem(this.TOKEN_KEY, res.token);
                }
                this._currentUser.set(this.decodeToken(res.token).sub);

            }));
    }

    logout(): void {
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(this.TOKEN_KEY);
        }
        this._currentUser.set(null);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        if (typeof localStorage === 'undefined') return null;
        return localStorage.getItem(this.TOKEN_KEY);
    }

    isLoggedIn(): boolean {
        const token = this.getToken();
        if (!token) return false;

        const payload = JSON.parse(atob(token.split('.')[1]));

        return payload.exp * 1000 > Date.now();
    }


    isAdmin(): boolean {
        return this.getLivelloPermessi() === 'ROLE_1';
    }


    isGestore(): boolean {
        return this.getLivelloPermessi() === 'ROLE_2';
    }


    isUtente(): boolean {
        return this.getLivelloPermessi() === 'ROLE_3';
    }

}