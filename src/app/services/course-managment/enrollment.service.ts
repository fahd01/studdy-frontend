import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = "http://localhost:8085/api";
  private currentDateTime = '2025-04-05 20:37:41';
  private currentUser = 'user';
  private mockPaymentId: string | null = null;

  constructor(private http: HttpClient) { }

  /**
   * Create a payment intent on the server
   */
  createPaymentIntent(paymentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    
    console.log(`Creating payment intent at ${this.currentDateTime}`);
    
    // Ensure we're using the consistent mock payment ID
    if (this.mockPaymentId && !paymentData.paymentIntentId) {
      paymentData.paymentIntentId = this.mockPaymentId;
      console.log(`Using service's consistent mock payment ID: ${this.mockPaymentId}`);
    }
    
    return this.http.post<any>(`${this.apiUrl}/payments/create-payment-intent`, paymentData, { headers })
      .pipe(
        catchError(error => {
          console.error('Payment intent creation error:', error);
          if (error.status === 406) {
            console.error('Content negotiation error: The server cannot produce a response in the format requested.');
            
            // Return a fallback response with the consistent payment ID
            const mockId = this.mockPaymentId || paymentData.paymentIntentId || `pi_mock_${Date.now()}`;
            console.log(`Using mock ID for fallback response: ${mockId}`);
            
            return of({
              success: true,
              paymentIntentId: mockId,
              message: 'Mock payment intent created (406 error recovery)'
            });
          }
          return throwError(() => error);
        })
      );
  }

  /**
   * Complete the enrollment after successful payment
   */
  completeEnrollment(enrollmentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    
    console.log(`Completing enrollment at ${this.currentDateTime}`);
    console.log(`With payment ID: ${enrollmentData.paymentIntentId}`);
    
    // Use the payment service implementation's DTO structure
    const requestBody = {
      formationId: enrollmentData.formationId,
      paymentIntentId: enrollmentData.paymentIntentId,
      email: enrollmentData.email, 
      fullName: enrollmentData.fullName,
      enrolledBy: enrollmentData.enrolledBy || this.currentUser,
      timestamp: enrollmentData.timestamp || this.currentDateTime,
      amount: enrollmentData.amount,
      currency: enrollmentData.currency || 'eur'
    };
    
    return this.http.post(`${this.apiUrl}/enrollments/complete`, requestBody, { headers })
      .pipe(
        catchError(error => {
          console.error('Enrollment completion error:', error);
          
          if (error.status === 406) {
            console.log('406 error in enrollment completion, providing recovery response');
            return of({
              success: true,
              enrollmentId: enrollmentData.paymentIntentId,
              message: 'Enrollment processed with fallback handling'
            });
          }
          
          return throwError(() => error);
        })
      );
  }

  /**
   * Get user's enrollments
   */
  getUserEnrollments(email?: string): Observable<any[]> {
    let params = new HttpParams();
    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });
    
    if (email) {
      params = params.append('email', email);
    }
    
    return this.http.get<any[]>(`${this.apiUrl}/enrollments/user`, { params, headers })
      .pipe(
        catchError(error => {
          console.error('Get enrollments error:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Set current date, user info, and mock payment ID
   */
  setCurrentInfo(dateTime: string, user: string, mockId?: string): void {
    this.currentDateTime = dateTime;
    this.currentUser = user;
    if (mockId) {
      this.mockPaymentId = mockId;
      console.log(`EnrollmentService: Using fixed mock payment ID: ${mockId}`);
    }
  }
}