import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl = 'http://localhost:8081/api/admin';

  constructor(private http: HttpClient) {}

  // Helper method to get the authorization headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    if (!token) {
      throw new Error('No authentication token found.');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    });
  }

  // Lock a user
  lockUser(userId: number): Observable<boolean> {
    const adminId = Number(localStorage.getItem('userId')); // Retrieve adminId from localStorage
    const headers = this.getHeaders();

    return this.http
        .put<boolean>(`${this.baseUrl}/lock/${userId}`, adminId, { headers })
        .pipe(catchError(this.handleError));
  }

  // Unlock a user
  unlockUser(userId: number): Observable<boolean> {
    const adminId = Number(localStorage.getItem('userId')); // Retrieve adminId from localStorage
    const headers = this.getHeaders();

    return this.http
        .put<boolean>(`${this.baseUrl}/unlock/${userId}`, adminId, { headers })
        .pipe(catchError(this.handleError));
  }

  // Delete an admin
  deleteAdminById(userId: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http
        .delete<void>(`${this.baseUrl}/deleteAdmin/${userId}`, { headers })
        .pipe(catchError(this.handleError));
  }

  // Handle errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    if (error.status === 403) {
      return throwError(() => new Error('You do not have permission to perform this action.'));
    } else {
      return throwError(() => new Error('Something went wrong. Please try again later.'));
    }
  }
}