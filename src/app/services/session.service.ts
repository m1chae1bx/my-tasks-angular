import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService, LoginPayload, RegisterPayload, TokenResponse } from './auth.service';
import { User, UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class  SessionService {

  private user: User;
  public id = Math.random();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { 
    this.user = this.loadUserFromToken(this.authService.getToken());
  }
  
  public getId() {
    return this.id;
  }

  public loadUserFromToken(token: string): User {
    if (!token) return null;
    var payload = token.split('.')[1];
    payload = window.atob(payload);
    console.log(JSON.parse(payload));
    return JSON.parse(payload);
  }

  public loadUserFromDB(user: User): Observable<any> {
    return this.userService.get(user.id).pipe(
      map((result: User) => {
        this.user = Object.assign(this.user ?? {}, user, result);
      })
    );
  }

  public getUser(): User {
    return this.user;
  }

  public removeUser() {
    this.user = null;
  }

  public reloadUser(): Observable<any> {
    console.log('reloading', this.user);
    return this.userService.get(this.user.id).pipe(
      map(user => this.user = Object.assign(this.user, user))
    );
  }

  public isLoggedIn(): Observable<boolean> {
    const user = this.getUser();
    console.log('user', user);
    if (user && user.exp > Date.now() / 1000) { 
      return this.loadUserFromDB(user).pipe(map(() => true));
    } else {
      return of(false);
    }
  }

  public login(payload: LoginPayload): Observable<any> {
    return this.authService.login(payload).pipe(
      switchMap((response: TokenResponse) => {
        return this.loadUserFromDB(this.loadUserFromToken(response.token))
      })
    );
  }

  public register(payload: RegisterPayload): Observable<any> {
    return this.authService.register(payload).pipe(
      switchMap((data: TokenResponse) => {
        return this.loadUserFromDB(this.loadUserFromToken(data.token));
      })
    );
  }

  public removeSession(): void {
    this.removeUser();
    this.authService.removeToken();
  }

  public logout(): void {
    this.removeSession();
    this.snackBar.open('Signed out successfully', null, {duration: 1500});
    this.router.navigateByUrl('/');
  }
}
