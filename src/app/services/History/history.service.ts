import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historic } from 'src/app/model/Historic/Historic';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private apiUrl = 'http://localhost:8081/api/history'; // Replace with your backend URL
    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    constructor(private http: HttpClient) {}


  getHistoryByUser(userId: number): Observable<Historic[]> {
      return this.http.get<Historic[]>(`${this.apiUrl}/user/${userId}`);
    }
}
