import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/features/public/environments/environments.component';


export interface Comment {
  id: number;
  content: string;
  blogId: number;
  userId: number;
  createdAt: string;
  username: string;
  likes: number;
  dislikes: number;
  rating: number;
   user?:{
    email:string;
  }
}

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  private apiUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) {}

  createComment(commentData: any): Observable<any> {
    return this.http.post(this.apiUrl, commentData);
  }

  getCommentsByBlogId(blogId: number): Observable<any> {
    return this.http.get<Comment[]>(`http://localhost:8080/comments/blogs/${blogId}`);
  }

  likeComment(commentId: number, userId: number): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/${commentId}/like`, null, { params: { userId: userId.toString() } });
  }

  dislikeComment(commentId: number, userId: number): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/${commentId}/dislike`, null, { params: { userId: userId.toString() } });
  }
  

  rateComment(commentid: number, rating: number): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/${commentid}/rate`, null, {
      params: { rating: rating.toString() }
    });
  }
  
}
