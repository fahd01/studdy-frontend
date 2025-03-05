import { Component, OnInit } from '@angular/core';
import { Blog, BlogService } from '../blog/blog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../comments/comments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { noBadWordsValidator } from '../comments/no-bad-words.validator';
import { UserService } from '../user/user.service';
import { Comment } from '../comments/comments.service';



@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  blog: Blog | undefined;
  commentForm: FormGroup;
  comments: Comment[] = [];
  users: { [key: number]: string } = {};
  userId: number = 1;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private fb: FormBuilder,
    private commentService: CommentService,
    private snackBar: MatSnackBar
  ) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required, noBadWordsValidator()]],
      blogId: [''],
      userId: [this.userId, [Validators.required]],
    });
  }

  ngOnInit(): void {
    const blogId = this.route.snapshot.paramMap.get('id');
    if (blogId) {
      this.blogService.getBlogById(+blogId).subscribe((data: Blog) => {
        this.blog = data;
        this.commentForm.patchValue({ blogId: this.blog.id });
        this.loadComments(+blogId);
      });
      
    }
  }

loadComments(blogId: number): void {
  this.commentService.getCommentsByBlogId(blogId).subscribe(
    (comments) => {
      this.comments = comments;
      this.loadUsernames();
    },
    (error) => {
      console.error('Error fetching comments: ', error);
    }
  );
}

loadUsernames(): void {
  const userIds = this.comments.map(comment => comment.userId);
  userIds.forEach(userId => {
    this.userService.getUserById(userId).subscribe(
      user => {
        this.users[userId] = user.username;
      },
      error => {
        console.error('Error fetching user: ', error);
      }
    );
  });
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
          if (this.blog) {
            this.loadComments(this.blog.id);
            
          }
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

  likeComment(commentId: number): void {
    this.commentService.likeComment(commentId, this.userId).subscribe(
      response => {
        console.log('Comment liked successfully', response);
        if (this.blog) {
          this.loadComments(this.blog.id);
        }
      },
      error => {
        console.error('Error liking comment', error);
      }
    );
  }

  dislikeComment(commentId: number): void {
    this.commentService.dislikeComment(commentId, this.userId).subscribe(
      response => {
        console.log('Comment disliked successfully', response);
        if (this.blog) {
          this.loadComments(this.blog.id);
        }
      },
      error => {
        console.error('Error disliking comment', error);
      }
    );
  }
}