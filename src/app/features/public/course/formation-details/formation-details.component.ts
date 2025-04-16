import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormationService } from '../../../../services/formation.service';
import { Formation } from '../../../../../model/Model';
import { switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface UserInfoDTO {
  name: string;
  email: string;
  address: string;
}

@Component({
  selector: 'app-formation-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './formation-details.component.html',
  styleUrls: ['./formation-details.component.css']
})
export class FormationDetailsComponent implements OnInit {
  formation: Formation | null = null;
  loading = true;
  error = '';
  formationId: number | null = null;
  activeTab: 'overview' | 'curriculum' | 'instructor' | 'reviews' = 'overview';
  relatedFormations: Formation[] = [];

  // User info for certificate
  certificateUserInfo: UserInfoDTO = {
    name: '',
    email: '',
    address: ''
  };

  // Certificate download state
  downloadingCertificate = false;
  showCertificateForm = false;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private formationService: FormationService,
      private http: HttpClient // Add HttpClient for API requests
  ) {}

  ngOnInit(): void {
    // Get formation ID from route and load data
    this.loadFormationData();
  }

  loadFormationData(): void {
    this.loading = true;
    this.error = '';

    // Get the ID from the route
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('Formation ID from route:', idParam);

    if (!idParam) {
      this.error = 'Formation ID is missing.';
      this.loading = false;
      return;
    }

    this.formationId = parseInt(idParam, 10);

    if (isNaN(this.formationId)) {
      this.error = 'Invalid Formation ID.';
      this.loading = false;
      return;
    }

    // Fetch formation data with proper error handling
    this.formationService.getFormationById(this.formationId)
        .pipe(
            tap(formation => console.log('Formation data received:', formation)),
            catchError(error => {
              console.error('Error fetching formation:', error);
              this.error = `Failed to load formation details: ${error.message || 'Unknown error'}`;
              return of(null);
            }),
            finalize(() => {
              this.loading = false;
              console.log('Formation loading completed, loading state:', this.loading);
            })
        )
        .subscribe(formation => {
          this.formation = formation;
        });
  }

  downloadCertificate(): void {
    if (!this.formation || !this.formationId) {
      alert('Formation information is not available');
      return;
    }

    // Toggle certificate form visibility
    this.showCertificateForm = true;
  }

  // Submit certificate request
  submitCertificateRequest(): void {
    // Validate form
    if (!this.certificateUserInfo.name || !this.certificateUserInfo.email) {
      alert('Please provide your name and email');
      return;
    }

    this.downloadingCertificate = true;

    // Get the current timestamp
    const currentDate = new Date().toISOString();
    console.log('Generating certificate at:', currentDate);

    // Use the correct API URL - check your backend service port!
    // Try with the server running on the default Spring Boot port if 8085 isn't working
    const apiUrl = `http://localhost:8085/api/certificates/generate/${this.formationId}`;

    console.log('Sending certificate request to:', apiUrl);
    console.log('With user data:', this.certificateUserInfo);

    // Make API request with user information and better error handling
    this.http.post(apiUrl, this.certificateUserInfo, {
      responseType: 'blob', // Important for file download
      observe: 'response',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/pdf'
      })
    }).pipe(
        catchError(error => {
          console.error('Error generating certificate:', error);

          // More detailed error handling
          let errorMessage = 'Failed to generate certificate. Please try again.';

          if (error.status === 0) {
            errorMessage = 'Network error: Cannot connect to the certificate server. Please verify the server is running and try again.';
            console.log('NETWORK ERROR: Server may be down or CORS issues');
          } else if (error.status === 404) {
            errorMessage = 'Certificate service not found. Please contact support.';
          } else if (error.status === 500) {
            errorMessage = 'Server error while generating certificate. Please try again later.';
          }

          //alert(errorMessage);
          this.downloadingCertificate = false;
          return of(null);
        }),
        finalize(() => {
          this.downloadingCertificate = false;
        })
    ).subscribe(response => {
      if (response && response.body) {
        // Process the response as before
        this.processPdfDownload(response.body);
      }
    });
  }

  // Helper method to process PDF download
  private processPdfDownload(blob: Blob): void {
    // Create file name from formation title and user name
    const formationTitle = this.formation?.title?.replace(/\s+/g, '_') || 'formation';
    const userName = this.certificateUserInfo.name.replace(/\s+/g, '_');
    const fileName = `certificate_${formationTitle}_${userName}.pdf`;

    // Create a blob from the PDF data
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;

    // Log success
    console.log('Certificate created successfully, initiating download');

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    window.URL.revokeObjectURL(url);
    this.showCertificateForm = false;

    // Clear form data
    this.certificateUserInfo = { name: '', email: '', address: '' };
  }

  // Cancel certificate form
  cancelCertificateForm(): void {
    this.showCertificateForm = false;
  }

  // Change active tab
  setActiveTab(tab: 'overview' | 'curriculum' | 'instructor' | 'reviews'): void {
    this.activeTab = tab;
  }

  // Format date range
  formatDateRange(start?: string | Date, end?: string | Date): string {
    if (!start || !end) return 'Dates not specified';

    const startDate = typeof start === 'string' ? new Date(start) : start;
    const endDate = typeof end === 'string' ? new Date(end) : end;

    return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
  }

  // Get formation image
  getFormationImage(): string {
    if (this.formation?.imagesUrls && this.formation.imagesUrls.length > 0) {
      return this.formation.imagesUrls[0];
    }
    return 'assets/landing/images/course-default.jpg';
  }

  // Format price
  formatPrice(price?: number): string {
    if (price === undefined) return 'Price not specified';
    return '$' + price.toFixed(2);
  }

  // Get participant count
  getParticipantCount(): number {
    return this.formation?.participants ? this.formation.participants.length : 0;
  }

  // Check if user is enrolled
  isUserEnrolled(): boolean {
    // Implementation will depend on your authentication setup
    // This is a placeholder for now
    return false;
  }

// Enroll in formation
enrollInFormation(): void {
  if (!this.formation?.id) {
    alert('Formation information is not available');
    return;
  }
  
  // Record enrollment attempt with timestamp
  console.log(`Enrollment initiated for formation ${this.formation.id} at ${new Date().toISOString()} by user: iitsMahdi`);
  
  // Navigate to the enrollment page with the formation ID
  this.router.navigate(['/enrollment', this.formation.id]);
}

  // Retry loading
  retryLoading(): void {
    this.loadFormationData();
  }
}