import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface User {
  id: string,
  email: string,
  username: string,
  nickname?: string,
  fullName?: string
  exp: number,
  iat: number
}

export interface LoginPayload {
  username: string,
  password: string
}

export interface RegisterPayload {
  username: string,
  password: string,
  email: string,
  fullName: string,
  nickname: string
}

export interface EditAccountPayload {
  fullName: string,
  nickname: string
}

interface TokenResponse {
  token: string;
}

const baseUrl = 'http://localhost:8080/api'

@Injectable({
  providedIn: 'root'
}) // @todo: check if necessary to provide in root; otherwise, @Injectable()
export class AuthService {
  private token: string; //@todo merge token and user
  public user: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  private saveUser(user: User) {
    console.log('saving user');
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  public getUser(): User {
    if (!this.user) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    return this.user;
  }

  private loadUserFromToken(token: string): User {
    var payload = token.split('.')[1];
    payload = window.atob(payload);
    console.log(JSON.parse(window.atob(token.split('.')[0])))
    // console.log(JSON.parse(window.atob(token.split('.')[2])))
    return JSON.parse(payload);
  }

  private loadUserFromDB(user: User): Observable<any> {
    console.log(user);
    return this.http.get(`${baseUrl}/user/${user.id}`, {headers: this.getAuthHeader()}).pipe(
      map((result: User) => {
        user.fullName = result.fullName;
        user.username = result.username;
        user.nickname = result.nickname;
        user.email    = result.email;
        this.saveUser(user);
      })
    );
  }

  public isLoggedIn(): boolean {
    const user = this.getUser();
    console.log('user', user);
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public getAuthHeader(): HttpHeaders {
    return new HttpHeaders()
      .set('Authorization', `Bearer ${this.getToken()}`);
  }

  public login(user: LoginPayload): Observable<any> {
    return this.http.post(`${baseUrl}/auth/login`, user).pipe(
      switchMap((data: TokenResponse) => {
        this.saveToken(data.token);
        return this.loadUserFromDB(this.loadUserFromToken(data.token));
      })
    );
  }

  public register(user: RegisterPayload): Observable<any> {
    return this.http.post(`${baseUrl}/auth/register`, user).pipe(
      switchMap((data: TokenResponse) => {
        this.saveToken(data.token);
        return this.loadUserFromDB(this.loadUserFromToken(data.token));
      })
    );
  }

  public editAccount(payload: EditAccountPayload): Observable<any> {
    const user: User = this.getUser();
    return this.http.put(`${baseUrl}/user/${user.id}`, payload, { headers: this.getAuthHeader()}).pipe(
      switchMap(() => {
        return this.loadUserFromDB(user);
      })
    );
  }

  public deleteAccount(password: string): Observable<any> {
    const user: User = this.getUser();
    return this.http.request(
      'delete',
      `${baseUrl}/user/${user.id}`, 
      {
        body: {
          username: user.username,
          password: password
        },
        headers: this.getAuthHeader()
      }
    );
  }

  public removeSession(): void {
    this.token = '';
    this.user = null;
    window.localStorage.removeItem('mean-token');
    window.localStorage.removeItem('user');
  }

  public logout(): void {
    this.removeSession();
    this.snackBar.open('Signed out successfully', null, {duration: 1500});
    this.router.navigateByUrl('/');
  }
}