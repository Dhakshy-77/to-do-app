import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class NoAdminGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const isAdmin = this.authService.isAdmin.getValue();
    return of(!isAdmin);
  }
}
