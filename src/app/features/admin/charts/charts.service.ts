import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../../public/blog/blog.service';
import { environment } from '../../public/environments/environments.component';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  private blogsUrl = `${environment.apiUrl}/api/blogs/all`;
  private userCountUrl = `${environment.apiUrl}/api/user/count`;
  
 

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.blogsUrl);
  }

  getUserCount(): Observable<number> {
    return this.http.get<number>(this.userCountUrl);
  }
}