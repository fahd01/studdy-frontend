import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../admin/notification.service';
import { BlogService } from '../public/blog/blog.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  newBlogs: any[] = [];

  constructor(
    private notificationService: NotificationService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.notificationService.newBlog$.subscribe((blog) => {
      this.newBlogs.push(blog);
    });
  }

  acceptBlog(blog: any) {
    this.blogService.updateBlogStatus(blog.id, 'accepted').subscribe(() => {
      this.newBlogs = this.newBlogs.filter(b => b.id !== blog.id);
    });
  }

  rejectBlog(blog: any) {
    this.blogService.updateBlogStatus(blog.id, 'rejected').subscribe(() => {
      this.newBlogs = this.newBlogs.filter(b => b.id !== blog.id);
    });
  }
}