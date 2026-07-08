import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Observable, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private TOKEN_KEY = 'token';

    constructor(private http: HttpClient, private router: Router) { }

    login(username: string, password: string): Observable<any> {
        return this.http.post('/api/auth/login', { username, password })
            .pipe(tap((res: any) => {
                localStorage.setItem(this.TOKEN_KEY, res.token);
            }));
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    isLoggedIn(): boolean {
        const token = this.getToken();
        if (!token) return false;

        const payload = JSON.parse(atob(token.split('.')[1]));
    
        return payload.exp * 1000 > Date.now(); 
    }
}