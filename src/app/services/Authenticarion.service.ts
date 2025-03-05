import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public getCurrentUser(): User | null {
    return new User(1, 'Test User', 'Test User', [Role.INSTRUCTOR])
  }
}

export class User {
  id: number;
  firstName: string;
  lastName: string;
  roles: Role[];

  constructor(id: number, firstName: string, lastName: string, roles: Role[]) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.roles = roles;
  }

  public isAdmin(): boolean{
    return this.roles.includes(Role.ADMIN)
  }

  public isInstructor(): boolean{
    return this.roles.includes(Role.INSTRUCTOR)
  }

  public isStudent(): boolean{
    return this.roles.includes(Role.STUDENT)
  }
}

export enum Role {
  STUDENT,
  INSTRUCTOR,
  ADMIN
}