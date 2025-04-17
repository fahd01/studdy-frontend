import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private newBlogSubject = new Subject<any>();

  newBlog$ = this.newBlogSubject.asObservable();

  notifyNewBlog(blog: any) {
    this.newBlogSubject.next(blog);
  }
}