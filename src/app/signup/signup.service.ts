import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  signup(user: any) {
    return this.http.post<any>(`${this.apiUrl}`, user);
  }
}
