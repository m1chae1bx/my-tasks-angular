import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

export interface TokenResponse {
  token: string;
}

const baseUrl = 'http://localhost:8080/api'

@Injectable({
  providedIn: 'root'
}) // @todo: check if necessary to provide in root; otherwise, @Injectable()
export class AuthService {
  private token: string; //@todo merge token and user
  // private user: User;

  constructor(
    private http: HttpClient,
    // private sessionService: SessionService
    // private userService: UserService // @todo fix circular dependency
  ) { }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getAuthHeader(): HttpHeaders {
    const token = this.getToken();
    if (token)
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    else
      return null;
  }

  public login(user: LoginPayload): Observable<any> {
    return this.http.post(`${baseUrl}/auth/login`, user)
      .pipe(
        switchMap((data: TokenResponse) => {
          this.saveToken(data.token);
          return of(data);
        })
      );
  }

  public register(user: RegisterPayload): Observable<any> {
    return this.http.post(`${baseUrl}/auth/register`, user).pipe(
      switchMap((data: TokenResponse) => {
        this.saveToken(data.token);
        return of(data);
      })
    );
  }

  public removeToken(): void {
    this.token = null;
    window.localStorage.removeItem('mean-token');
  }
}