import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  emailForm: FormGroup;
  recipientEmail: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { 
    this.emailForm = this.fb.group({
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const email = this.route.snapshot.queryParamMap.get('email');
 
    // Use conditional (ternary) operator to handle null values
    this.recipientEmail = email !== null ? email : '';
   }

  onSubmit(): void {
    if (this.emailForm.valid) {
      const emailData = {
        to: this.recipientEmail,
        subject: this.emailForm.get('subject')?.value || '',
        text: this.emailForm.get('message')?.value || ''
      };

      this.http.post('/api/sendEmail', emailData).subscribe(
        response => {
          console.log('Email sent successfully:', response);
          this.router.navigate(['/blog-details']);
        },
        error => {
          console.error('Error sending email:', error);
        }
      );
    }
  }
}