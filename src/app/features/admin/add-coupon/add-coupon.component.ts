import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Formation } from 'src/app/models/Model';
import { CouponService } from 'src/app/services/course-managment/coupon.service';
import { FormationService } from 'src/app/services/formation.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {
  couponForm: FormGroup;
  formations: Formation[] = [];
  loading = false;
  submitting = false;
  success = false;
  error = '';


  constructor(
    private fb: FormBuilder,
    private couponService: CouponService,
    private formationService: FormationService,
    private router: Router
  ) {
    this.couponForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      discountPercentage: [10, [Validators.required, Validators.min(1), Validators.max(100)]],
      formationId: ['', Validators.required],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.loadFormations();
  }

  loadFormations(): void {
    this.loading = true;
    this.formationService.getAllFormations()
      .pipe(
        catchError(error => {
          console.error('Error loading formations:', error);
          this.error = 'Failed to load formations. Please refresh and try again.';
          return of([]);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(formations => {
        this.formations = formations;
        if (formations.length > 0) {
          this.couponForm.patchValue({
            formationId: formations[0].id
          });
        }
      });
  }

  onSubmit(): void {
    if (this.couponForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.couponForm.controls).forEach(key => {
        this.couponForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.submitting = true;
    this.error = '';
    this.success = false;

    const formationId = +this.couponForm.get('formationId')!.value;
    const couponData = {
      code: this.couponForm.get('code')!.value,
      discountPercentage: this.couponForm.get('discountPercentage')!.value,
      isActive: this.couponForm.get('isActive')!.value
    };

    console.log('Creating new coupon:', couponData, 'for formation ID:', formationId);

    this.couponService.createCoupon(couponData, formationId)
      .pipe(
        catchError(error => {
          console.error('Error creating coupon:', error);
          if (error.status === 400 && error.error && error.error.message) {
            this.error = error.error.message;
          } else {
            this.error = 'Failed to create coupon. Please try again.';
          }
          return of(null);
        }),
        finalize(() => {
          this.submitting = false;
        })
      )
      .subscribe(response => {
        if (response) {
          console.log('Coupon created successfully:', response);
          this.success = true;
          this.resetForm();

          // Optionally, redirect after a delay
          setTimeout(() => {
            this.router.navigate(['/admin/coupons']);
          }, 2000);
        }
      });
  }

  resetForm(): void {
    this.couponForm.reset({
      code: '',
      discountPercentage: 10,
      formationId: this.formations.length > 0 ? this.formations[0].id : '',
      isActive: true
    });
  }

  // Helper getter for easy access to form fields in the template
  get f() {
    return this.couponForm.controls;
  }
}
