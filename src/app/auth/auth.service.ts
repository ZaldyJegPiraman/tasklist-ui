import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = 'https://localhost:7151/api/auth';
  private tokenKey = 'token';

  /** 🔔 Reactive auth state */
  private _isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient) {}

  /* ======================
     AUTH ACTIONS
     ====================== */

  /** LOGIN */
  login(data: any) {
    return this.http
      .post<any>(`${this.api}/login`, data)
      .pipe(
        tap(res => {
          localStorage.setItem(this.tokenKey, res.token);
          this._isLoggedIn$.next(true);
        })
      );
  }

  /** LOGOUT */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this._isLoggedIn$.next(false);
  }

  /* ======================
     TOKEN HELPERS
     ====================== */

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  get token(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }
 
  /* ======================
     USER INFO (JWT)
     ====================== */

  /** ✅ USER EMAIL FOR NAVBAR */
  get userEmail(): string | null {
    const token = this.token;
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      return (
        payload.email ||
        payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']
      );
    } catch {
      return null;
    }
  }
register(data: any) {
  return this.http.post(
    `${this.api}/register`,
    data,
    { responseType: 'text' } // ✅ IMPORTANT
  );
}
  
}
