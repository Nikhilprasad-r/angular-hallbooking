import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'http://localhost:8080'; // Set your API base URL here

  constructor(private http: HttpClient) {}

  createBooking(
    hallId: string,
    date: string,
    user: { name: string; phone: string }
  ): Observable<any> {
    const body = { hallId, date, user };
    return this.http.post(`${this.baseUrl}/api/bookings`, body);
  }

  fetchBookings(hallId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/bookings?hallId=${hallId}`);
  }

  fetchHalls(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/halls`);
  }

  createHall(name: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/halls`, { name });
  }

  handleRegister(username: string, password: string): Observable<string> {
    return this.http
      .post<{ message: string }>(`${this.baseUrl}/api/auth/register`, { username, password })
      .pipe(map((response) => response.message));
  }

  handleLogin(username: string, password: string): Observable<string> {
    return this.http
      .post<{ message: string }>(`${this.baseUrl}/api/auth/login`, { username, password })
      .pipe(map((response) => response.message));
  }
}
