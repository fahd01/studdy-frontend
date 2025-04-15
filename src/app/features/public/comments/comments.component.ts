import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/features/public/comments/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentComponent {
  commentForm: FormGroup;

  constructor(private fb: FormBuilder, private commentService: CommentService) {
    this.commentForm = this.fb.group({
      content: ['', [Validators.required]],
      blogId: ['', [Validators.required]],
      userId: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.commentForm.valid) {
      this.commentService.createComment(this.commentForm.value).subscribe(response => {
        console.log('Comment added successfully', response);
      });
    }
  }
}