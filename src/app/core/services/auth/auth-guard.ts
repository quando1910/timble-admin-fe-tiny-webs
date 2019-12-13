import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isAccessTokenExpired()) {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
    return true;
  }
}

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.auth.isAccessTokenExpired()) {
      this.router.navigateByUrl('/admin');
      return false;
    }
    return true;
  }
}
