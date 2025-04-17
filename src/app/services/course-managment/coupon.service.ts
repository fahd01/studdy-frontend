import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private apiUrl = "http://localhost:8085/api/coupons";

  
  constructor(private http: HttpClient) { }

  validateCoupon(code: string, formationId: number): Observable<{ isValid: boolean }> {
    const params = new HttpParams()
      .set('couponCode', code.trim())
      .set('formationId', formationId.toString());

    console.log(`Validating coupon: ${code} for formation: ${formationId}`);
    
    return this.http.get<any>(`${this.apiUrl}/validate`, { params })
      .pipe(
        map(response => {
          console.log('Raw coupon validation response:', response);
          
          // Handle both formats - direct boolean or object with isValid property
          let isValid = false;
          if (typeof response === 'boolean') {
            isValid = response;
          } else if (response && typeof response === 'object') {
            isValid = response.isValid === true;
          }
          
          console.log(`Processed isValid value: ${isValid}`);
          return { isValid: isValid };
        }),
        catchError(error => {
          console.error('Error validating coupon:', error);
          return throwError(() => error);
        })
      );
  }

  applyCoupon(code: string, formationId: number): Observable<{ discountedPrice: number, isValid: boolean }> {
    const params = new HttpParams()
      .set('couponCode', code.trim())
      .set('formationId', formationId.toString());

    console.log(`Applying coupon: ${code} for formation: ${formationId}`);
    
    return this.http.post<any>(`${this.apiUrl}/apply`, null, { params })
      .pipe(
        map(response => {
          console.log('Raw apply coupon response:', response);
          
          // Handle both response formats
          let result: { discountedPrice: number, isValid: boolean } = {
            discountedPrice: 0,
            isValid: false
          };
          
          if (response) {
            // If response is an object with the expected properties
            if (typeof response === 'object') {
              result.discountedPrice = response.discountedPrice || 0;
              
              // Check isValid property or assume true if we have a discounted price
              if (response.hasOwnProperty('isValid')) {
                result.isValid = response.isValid === true;
              } else {
                result.isValid = response.discountedPrice !== undefined;
              }
            }
          }
          
          console.log('Processed coupon response:', result);
          return result;
        }),
        catchError(error => {
          console.error('Error applying coupon:', error);
          return throwError(() => error);
        })
      );
  }

  getAllCoupons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getCouponsByFormation(formationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/formation/${formationId}`);
  }

  createCoupon(coupon: any, formationId: number): Observable<any> {
    console.log(`Creating coupon: ${coupon.code} for formation: ${formationId}`);
    return this.http.post<any>(`${this.apiUrl}/${formationId}`, coupon);
  }

  deactivateCoupon(couponId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${couponId}/deactivate`, null);
  }
}