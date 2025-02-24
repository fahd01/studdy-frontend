import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/features/public/environments/environments.component';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) {}

  createComment(commentData: any): Observable<any> {
    return this.http.post(this.apiUrl, commentData);
  }
}
