import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog, BlogService } from './blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  totalPages: number = 0;
  currentPage: number = 0;

  postId!: number;
  postDetails: any;

  blogForm: FormGroup;
  blogs: Blog[] = [];
  editMode = false;
  currentBlogId: number | null = null;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private blogService: BlogService,
              private router: Router) {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllBlogs(0);
  }

  getAllBlogs(page: number): void {
    this.blogService.getAllBlogs(page, 6).subscribe(data => {
      this.blogs = data.content;
      this.totalPages = data.totalPages;
      this.currentPage = data.number;
    }, error => {
      console.error('Error loading blogs:', error);
    });
  }

  viewBlogDetails(id: number): void {
    this.router.navigate(['/blogs', id]);
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.getAllBlogs(page);
    }
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      if (this.editMode && this.currentBlogId) {
        this.blogService.updateBlog(this.currentBlogId, this.blogForm.value).subscribe(
          () => {
            this.getAllBlogs(this.currentPage);
            this.resetForm();
          },
          (error) => {
            console.error('Error updating blog:', error);
          }
        );
      } else {
        this.blogService.createBlog(this.blogForm.value).subscribe(
          () => {
            this.getAllBlogs(this.currentPage);
            this.resetForm();
          },
          (error) => {
            console.error('Error creating blog:', error);
          }
        );
      }
    }
  }

  editBlog(blog: Blog): void {
    this.editMode = true;
    this.currentBlogId = blog.id;
    this.blogForm.patchValue({
      title: blog.title,
      author: blog.author,
      content: blog.content
    });
  }

  deleteBlog(id: number): void {
    if (confirm('Are you sure you want to delete this blog post?')) {
      this.blogService.deleteBlog(id).subscribe(
        () => {
          this.getAllBlogs(this.currentPage);
        },
        (error) => {
          console.error('Error deleting blog:', error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.editMode = false;
    this.currentBlogId = null;
    this.blogForm.reset();
  }

  fetchPostDetails(): void {
    // Fetch post details using the postId
    // For simplicity, hardcode it here or fetch it from a backend
    this.postDetails = {
      title: "I'm not creative, Should I take this course?",
      content: "This is where the full content of the blog post would go...",
      date: "Sept. 17, 2020",
      author: "Admin"
    };
  }
}
