import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Reclamation } from '../../models/reclamation.model';
import {catchError, Observable, throwError} from 'rxjs';
import {BadWordResponse} from "../../models/bad-word.response";

@Injectable({
  providedIn: 'root',
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8081/api/reclamations'; // Replace with your backend URL
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) {}

  // Create a new reclamation for a specific user
 /* createReclamation(userId: number, reclamation: Reclamation): Observable<Reclamation> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<Reclamation>(`${this.apiUrl}/createReclamation/${userId}`, reclamation, { headers });
  }*/

  // Get all reclamations
  getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.apiUrl}/getAllReclamations`);
  }

  // Get a reclamation by ID
  getReclamationById(id: number): Observable<Reclamation> {
    return this.http.get<Reclamation>(`${this.apiUrl}/getReclamationById/${id}`);
  }

  // Update a reclamation
 /* updateReclamation(id: number, updatedReclamation: Reclamation): Observable<Reclamation> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.put<Reclamation>(`${this.apiUrl}/updateReclamation/${id}`, updatedReclamation, { headers });
  }
*/
  // Delete a reclamation
  deleteReclamation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteReclamation/${id}`);
  }
  // Get reclamations by userId
  getReclamationsByUser(userId: number): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(`${this.apiUrl}/getReclamationsByUser/${userId}`);
  }


  // Create a new reclamation with bad word detection handling
  createReclamation(userId: number, reclamation: Reclamation): Observable<Reclamation | BadWordResponse> {
    return this.http.post<any>(
        `${this.apiUrl}/createReclamation/${userId}`,
        reclamation,
        this.httpOptions
    ).pipe(
        catchError(this.handleError)
    );
  }

  // Update a reclamation with bad word detection handling
  updateReclamation(id: number, updatedReclamation: Reclamation): Observable<Reclamation | BadWordResponse> {
    return this.http.put<any>(
        `${this.apiUrl}/updateReclamation/${id}`,
        updatedReclamation,
        this.httpOptions
    ).pipe(
        catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`);

      // Check if this is a bad word detection response
      if (error.error && error.error.status === 'rejected') {
        // Return the bad word response to be handled by the component
        return throwError(() => error.error as BadWordResponse);
      }
    }
    // Return a generic error message
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
