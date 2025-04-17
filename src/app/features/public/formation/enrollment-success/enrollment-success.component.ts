import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormationService } from '../../../../services/formation.service';
import { EnrollmentService } from '../../../../services/course-managment/enrollment.service';

@Component({
  selector: 'app-enrollment-success',
  templateUrl: './enrollment-success.component.html',
  styleUrls: ['./enrollment-success.component.css']
})
export class EnrollmentSuccessComponent implements OnInit {
  formationId: number | null = null;
  email: string | null = null;
  enrollmentId: string | null = null;
  mockMode: boolean = false;
  formation: any = null;
  enrollment: any = null;
  loading = true;
  error = '';
  
  // Add current timestamp for tracking
  currentDateTime = '2025-04-05 19:35:18';
  currentUser = 'user';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formationService: FormationService,
    private enrollmentService: EnrollmentService
  ) { }

  ngOnInit(): void {
    console.log('EnrollmentSuccess component initialized');
    
    // Get the parameters from the route
    this.route.queryParams.subscribe(params => {
      this.formationId = params['formationId'] ? +params['formationId'] : null;
      this.email = params['email'] || null;
      this.enrollmentId = params['enrollmentId'] || null;
      this.mockMode = params['mock'] === 'true';
      
      console.log(`Enrollment success page loaded at ${this.currentDateTime}`);
      console.log(`Parameters: formationId=${this.formationId}, email=${this.email}, enrollmentId=${this.enrollmentId}, mockMode=${this.mockMode}`);
      
      if (this.formationId && this.email) {
        this.loadData();
      } else {
        this.error = 'Missing formation or user information';
        this.loading = false;
      }
    });
  }
  
  loadData(): void {
    // Load formation details
    if (this.formationId) {
      this.formationService.getFormationById(this.formationId)
        .pipe(
          catchError(error => {
            console.error('Error loading formation:', error);
            return of(null);
          })
        )
        .subscribe(formation => {
          this.formation = formation;
          
          if (this.mockMode) {
            // Create mock enrollment data for display
            console.log('Using mock enrollment data for display');
            this.enrollment = {
              id: this.enrollmentId || 'mock-' + Date.now(),
              formationId: this.formationId,
              formationTitle: formation?.title || 'Unknown Course',
              enrollmentDate: new Date(),
              status: 'ENROLLED',
              progressPercentage: 0,
              email: this.email,
              fullName: this.currentUser
            };
            this.loading = false;
          } else {
            this.loadEnrollment();
          }
        });
    }
  }
  
  loadEnrollment(): void {
    // Get the user's enrollments and filter for this formation
    if (this.email) {
      this.enrollmentService.getUserEnrollments(this.email)
        .pipe(
          catchError(error => {
            console.error('Error loading enrollments:', error);
            
            // Create mock enrollment as fallback
            if (this.formation) {
              this.enrollment = {
                id: this.enrollmentId || 'fallback-' + Date.now(),
                formationId: this.formationId,
                formationTitle: this.formation.title || 'Unknown Course',
                enrollmentDate: new Date(),
                status: 'ENROLLED',
                progressPercentage: 0,
                email: this.email,
                fullName: this.currentUser
              };
            } else {
              this.error = 'Could not load enrollment details';
            }
            
            this.loading = false;
            return of([]);
          })
        )
        .subscribe(enrollments => {
          if (enrollments && enrollments.length > 0) {
            // Find the enrollment for this formation
            this.enrollment = enrollments.find(e => e.formationId === this.formationId);
            
            // If not found but we have formation info, create a placeholder
            if (!this.enrollment && this.formation) {
              console.log('No matching enrollment found, using placeholder data');
              this.enrollment = {
                id: this.enrollmentId || 'placeholder-' + Date.now(),
                formationId: this.formationId,
                formationTitle: this.formation.title,
                enrollmentDate: new Date(),
                status: 'ENROLLED',
                progressPercentage: 0,
                email: this.email,
                fullName: this.currentUser
              };
            }
          } else if (this.formation) {
            // No enrollments returned, use placeholder
            this.enrollment = {
              id: this.enrollmentId || 'placeholder-' + Date.now(),
              formationId: this.formationId,
              formationTitle: this.formation.title,
              enrollmentDate: new Date(),
              status: 'ENROLLED',
              progressPercentage: 0,
              email: this.email,
              fullName: this.currentUser
            };
          }
          
          this.loading = false;
        });
    }
  }
  
  startLearning(): void {
    if (this.formationId) {
      this.router.navigate(['/courses', this.formationId, 'learn']);
    }
  }
  
  viewAllCourses(): void {
    this.router.navigate(['/enrollments/ayarimahdi@outlook.com']);
  }
  
  getEnrollmentStatus(): string {
    return this.enrollment?.status || 'ENROLLED';
  }
  
  getFormationTitle(): string {
    return this.formation?.title || this.enrollment?.formationTitle || 'Course';
  }
  
  getEnrollmentDate(): Date {
    return this.enrollment?.enrollmentDate || new Date();
  }
}