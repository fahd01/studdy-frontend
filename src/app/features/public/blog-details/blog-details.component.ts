import { Component, OnInit } from '@angular/core';
import { Blog, BlogService } from '../blog/blog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../comments/comments.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  blog: Blog | undefined;
  commentForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private fb: FormBuilder,
    private commentService: CommentService,
    private snackBar: MatSnackBar
  ) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required]],
      blogId: [''],
      userId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      this.blogService.getBlogById(+blogId).subscribe((data: Blog) => {
        this.blog = data;
        this.commentForm.patchValue({ blogId: this.blog.id });
      });
    }
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      this.commentService.createComment(this.commentForm.value).subscribe(
        response => {
          console.log('Comment added successfully', response);
          this.snackBar.open('Comment added successfully!', 'Close', {
            duration: 3000,
          });
          this.commentForm.reset();
        },
        error => {
          console.error('Error adding comment', error);
          this.snackBar.open('Failed to add comment.', 'Close', {
            duration: 3000,
          });
        }
      );
    }
  }
}