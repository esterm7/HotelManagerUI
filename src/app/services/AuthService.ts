import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Router } from '@angular/router';
import { Observable, tap } from "rxjs";
import { AuthDto } from "../DTO/authDTO";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _currentUser = signal<string | null>(null);


    private TOKEN_KEY = 'token';

    constructor(private http: HttpClient, private router: Router) { }

    login(authDTO: AuthDto): Observable<any> {
        return this.http.post('/api/auth/login', authDTO )
            .pipe(tap((res: any) => {
                console.log('dentro pipe'+res);
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem(this.TOKEN_KEY, res.token);
                }
                this._currentUser.set(authDTO.codiceUtente);

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

    getLivelloPermessi(): string | null {
        const token = this.getToken();
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.livelloPeressi
        } catch {
            return null;
        }
    }

    isAdmin(): boolean {
        return this.getLivelloPermessi() === 'ROLE_ADMIN';
    }


    isGestore(): boolean {
        return this.getLivelloPermessi() === 'ROLE_GESTORE';
    }


    isUtente(): boolean {
        return this.getLivelloPermessi() ===  'ROLE_USER';
    }


    currentUser = this._currentUser.asReadonly();


}