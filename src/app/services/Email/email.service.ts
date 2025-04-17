import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmailDto } from "../../models/EmailDto";

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl = 'http://localhost:8081/api/v1/email';

  constructor(private http: HttpClient) { }

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

  // Send emails with authentication token
  sendEmails(emailData: EmailDto): Observable<string> {
    const headers = this.getHeaders(); // Include the token in the request headers
    return this.http.post(`${this.baseUrl}/send`, emailData, { headers, responseType: 'text' })
        .pipe(
            catchError(this.handleError) // Handle errors
        );
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
