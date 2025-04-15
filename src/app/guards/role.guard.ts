import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {AuthService} from "../services/Authservice/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Get the required roles from the route data
    const requiredRoles = route.data['roles'] as Array<string>;

    // Get the user's roles dynamically from the AuthService
    const userRoles = this.authService.getUserRoles();

    // If the user is an ADMIN, allow access to everything
    if (this.authService.isAdmin()) {
      return true;
    }

    // Check if the user has at least one of the required roles
    const hasAccess = requiredRoles.some(role => userRoles.includes(role));

    if (!hasAccess) {
      // Redirect to unauthorized page if the user doesn't have the required role
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}