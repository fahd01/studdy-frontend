import { Component, OnInit } from '@angular/core';
import {  Output, EventEmitter } from '@angular/core';
import { NotificationService } from '../../../features/admin/notification.service';
import { BlogService } from '../../../features/public/blog/blog.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  newBlogs: any[] = [];

  // Method to emit toggle event
  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

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
