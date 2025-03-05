import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments.component';

export interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  username: string;
}



@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = `${environment.apiUrl}/api/blogs`;

  constructor(private http: HttpClient) { }

  getAllBlogs(page: number, size: number, searchTerm: string = ''): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}&searchTerm=${searchTerm}`);
  }

  getBlogById(id: number): Observable<any> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  createBlog(blog: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, blog);
  }

  updateBlog(id: number, blog: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, blog);
  }

  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

    createComment(blogId: number, comment: Comment): Observable<any> {
    return this.http.post(`${this.apiUrl}/${blogId}/comments`, comment);
  }
}