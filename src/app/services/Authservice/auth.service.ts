import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRoles: string[] = []; // Initialize as empty

  // Method to set user roles (e.g., after login)
  setUserRoles(roles: string[]): void {
    this.userRoles = roles;
  }

  // Method to get user roles
  getUserRoles(): string[] {
    return this.userRoles;
  }

  // Method to check if the user has a specific role
  hasRole(role: string): boolean {
    return this.userRoles.includes(role);
  }

  // Method to check if the user is an ADMIN
  isAdmin(): boolean {
    return this.userRoles.includes('ADMIN');
  }
}