import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { AuthService } from './auth.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    // private auth: AuthService,
    private sessionService: SessionService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.sessionService.isLoggedIn().pipe(
        map(response => {
          console.log('auth guard session service id', this.sessionService.getId());
          console.log('isLoggedIn', response);
          if (!response) {
            this.router.navigate(['/login']);
            return false;
          } else {
            return true;
          }
        })
      );
  }
  
}
