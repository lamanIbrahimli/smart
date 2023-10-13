import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/signin';

  constructor(private http: HttpClient) {}

  signIn(signInData: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, signInData);
  }
}
