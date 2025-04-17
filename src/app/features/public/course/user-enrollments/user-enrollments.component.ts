import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { EnrollmentService } from 'src/app/services/course-managment/enrollment.service';

@Component({
  selector: 'app-user-enrollments',
  templateUrl: './user-enrollments.component.html',
  styleUrls: ['./user-enrollments.component.css']
})
export class UserEnrollmentsComponent implements OnInit, OnDestroy {
  userEmail: string = '';
  enrollments: any[] = [];
  loading: boolean = true;
  error: string = '';
  currentDateTime = '2025-04-05 20:56:16';
  currentUser = 'user';
  
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    // Get user email from route params or use current user's email
    this.route.params.subscribe(params => {
      if (params['email']) {
        this.userEmail = params['email'];
      } else {
        // Default to current user
        this.userEmail = 'ayarimahdi@outlook.com'; // Use the current logged-in user's email
      }
      this.loadEnrollments();
    });
  }
  
  ngOnDestroy(): void {
    // Clean up subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  loadEnrollments(): void {
    this.loading = true;
    this.error = '';
    
    console.log(`Loading enrollments for user: ${this.userEmail}`);
    
    const enrollmentsSub = this.enrollmentService.getUserEnrollments(this.userEmail)
      .pipe(
        catchError(error => {
          console.error('Error loading enrollments:', error);
          this.error = 'Failed to load enrollments. Please try again later.';
          return of([]);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(enrollments => {
        this.enrollments = enrollments;
        console.log(`Loaded ${enrollments.length} enrollments for user: ${this.userEmail}`);
      });
      
    this.subscriptions.push(enrollmentsSub);
  }
  
  getEnrollmentStatus(status: string): string {
    switch(status) {
      case 'ACTIVE':
        return 'In Progress';
      case 'COMPLETED':
        return 'Completed';
      case 'CANCELLED':
        return 'Cancelled';
      default:
        return status;
    }
  }
  
  getStatusClass(status: string): string {
    switch(status) {
      case 'ACTIVE':
        return 'status-active';
      case 'COMPLETED':
        return 'status-completed';
      case 'CANCELLED':
        return 'status-cancelled';
      default:
        return '';
    }
  }
  
  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if invalid
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}