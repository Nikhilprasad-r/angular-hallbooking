import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'; // Add the cookie service

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.checkInitialAuthStatus());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private cookieService: CookieService) {}

  private checkInitialAuthStatus(): boolean {
    // Check if the token exists in the cookie
    const token = this.cookieService.get('token'); // Replace 'token' with your cookie name
    return token ? true : false; // If token exists, user is authenticated
  }

  login(): void {
    this.isAuthenticatedSubject.next(true);
  }

  logout(): void {
    this.cookieService.delete('token'); // Delete the token from the cookie
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
