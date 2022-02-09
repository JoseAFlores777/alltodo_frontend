import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginForm, RegisterForm } from '../interfaces/forms.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user?: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get id(): string {
    return localStorage.getItem('id') || '';
  }

  get headers() {
    return {
      headers: {
        Authorization: this.token,
      },
    };
  }

  completeCurrentUserName(): string {
    return `${this.user?.firstName} ${this.user?.lastName}`;
  }

  saveInLocalStorage(token: string) {
    localStorage.setItem('Authorization', token);
  }

  logout() {
    localStorage.removeItem('Authorization');
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/auth/renew`, {
        headers: {
          'Authorization': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const {
            id,
            firstName,
            lastName,
            gender,
            email,
            verifiedEmail,
            password,
            avatarImg,
            googleAvatarImg,
            googleSignIn,
            createdAt,
            updatedAt,
            isAvailable,
          } = resp.user;
          this.user = new User(
            id,
            firstName,
            lastName,
            gender,
            email,
            verifiedEmail,
            password,
            avatarImg,
            googleAvatarImg,
            googleSignIn,
            createdAt,
            updatedAt,
            isAvailable
          );
          console.log('resp.user', resp.user);
          this.saveInLocalStorage(resp.jwt);
          return true;
        }),
        catchError((error) => of(false))
      );
  }


  login(formData: LoginForm) {
    return this.http.post(`${base_url}/auth`, formData).pipe(
      tap((resp: any) => {
        this.saveInLocalStorage(resp.jwt);
      })
    );
  }

  signup(formData: RegisterForm) {
    return this.http.post(`${base_url}/auth/signup`, formData).pipe(
      tap((resp: any) => {
        this.saveInLocalStorage(resp.jwt);
      })
    );
  }

  isEmailVerified(email: string): Observable<boolean> {
    return this.http.get(`${base_url}/auth/users/is-verified/${email}`).pipe(
      map((resp: any) => {
        this.saveInLocalStorage(resp.jwt);
        return true;
      }),
      catchError((err) => of(false))
    );
  }

  sendVerificationEmail(email: string): Observable<boolean> {
    return this.http
      .get(`${base_url}/auth/email-verification/${email}`)
      .pipe(
        map((resp: any) => {
          return true;
        }),
        catchError((err) => of(false))
      );
  }





}
