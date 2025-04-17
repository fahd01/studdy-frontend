import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from "../models/Model";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8085/api/users';

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }


  /*************************************************************/
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check local storage or session for existing user
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    } else {
      // For demo purposes, we'll set a default user
      const defaultUser = {
        username: 'iitsMahdi',
        email: 'iitsMahdi@example.com',
        fullName: 'Mahdi',
        role: 'user'
      };
      this.currentUserSubject.next(defaultUser);
      localStorage.setItem('currentUser', JSON.stringify(defaultUser));
    }
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  login(username: string, password: string): Observable<any> {
    // This should call your actual login API
    // For demo, we'll just return a mock user
    if (username === 'iitsMahdi') {
      const user = {
        username: 'iitsMahdi',
        email: 'iitsMahdi@example.com',
        fullName: 'Mahdi',
        role: 'user'
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of(user);
    }
    return of(null).pipe(
        catchError(error => {
          console.error('Login error:', error);
          return of(null);
        })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
