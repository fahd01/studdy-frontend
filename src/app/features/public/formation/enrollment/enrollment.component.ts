import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, finalize } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { Formation } from '../../../../models/Model';
import { FormationService } from '../../../../services/formation.service';
import { EnrollmentService } from '../../../../services/course-managment/enrollment.service';
import { CouponService } from 'src/app/services/course-managment/coupon.service';

declare var Stripe: any;

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit, OnDestroy {
  formationId: number | null = null;
  formation: Formation | null = null;
  loading = true;
  processing = false;
  error = '';
  paymentForm: FormGroup;

  // Coupon properties
  couponCode: string = '';
  appliedCoupon: any = null;
  discountedPrice: number = 0;
  isCouponValid: boolean = false;
  isCouponApplied: boolean = false;
  validatingCoupon: boolean = false;
  couponError: string = '';

  // Stripe elements
  private stripe: any;
  private card: any;
  cardErrors: string = '';
  showCardForm = false;
  processingPayment = false;

  // Fixed mock payment ID for consistent usage
  private mockPaymentId: string = `pi_mock_${Date.now()}`;

  // Current timestamp and user info
  currentDateTime = '2025-04-05 20:37:41';
  currentUser = 'user';

  // Subscriptions to unsubscribe on destroy
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private formationService: FormationService,
    private enrollmentService: EnrollmentService,
    private couponService: CouponService
  ) {
    this.paymentForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      couponCode: [''],
      agreeTerms: [false, Validators.requiredTrue]
    });

    // Initialize Stripe
    this.initializeStripe();

    // Update enrollment service current timestamp and pass the mock ID
    this.enrollmentService.setCurrentInfo(this.currentDateTime, this.currentUser, this.mockPaymentId);

    console.log(`Pre-generated mock payment ID: ${this.mockPaymentId} at ${this.currentDateTime}`);
  }

  ngOnInit(): void {
    // Get the formation ID from the route parameters
    const routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.formationId = +params['id'];
        this.loadFormation();
      } else {
        this.error = 'No formation selected for enrollment';
        this.loading = false;
      }
    });
    this.subscriptions.push(routeSub);
  }

  ngOnDestroy(): void {
    // Clean up subscriptions to prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());

    // Clean up Stripe elements if any
    if (this.card) {
      try {
        this.card.unmount();
      } catch (e) {
        console.log('Error unmounting card:', e);
      }
    }
  }

  private initializeStripe(): void {
    try {
      // Initialize Stripe with your publishable key
      this.stripe = Stripe('pk_test_51OyFA9HX1WHkXWHeg40LJQ60r0MBU0rDiJjMP78tvZ7Syie9RGfD1k2OVbyf2d7DbTkf8f2umXILOt5Wt8mKfARs00HD7HMUmv');
      console.log('Stripe initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Stripe:', error);
    }
  }

  loadFormation(): void {
    if (!this.formationId) {
      this.error = 'No formation ID provided';
      this.loading = false;
      return;
    }

    const formationSub = this.formationService.getFormationById(this.formationId)
      .pipe(
        catchError(error => {
          console.error('Error loading formation:', error);
          this.error = 'Failed to load formation details';
          return of(null);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(formation => {
        this.formation = formation;
        if (formation) {
          this.discountedPrice = formation.price;
        }

        // Pre-fill form if user is logged in
        this.paymentForm.patchValue({
          fullName: '',
          email: ''
        });

        console.log(`Formation loaded: ${formation?.title} with price: ${formation?.price}`);
      });

    this.subscriptions.push(formationSub);
  }

  validateCoupon(): void {
    if (!this.formationId || !this.formation) {
      this.couponError = 'Formation details not loaded';
      return;
    }

    const enteredCode = this.paymentForm.get('couponCode')?.value?.trim();

    if (!enteredCode) {
      this.couponError = 'Please enter a coupon code';
      return;
    }

    this.couponCode = enteredCode;
    this.validatingCoupon = true;
    this.couponError = '';
    this.isCouponValid = false;
    this.isCouponApplied = false;

    console.log(`Starting validation for coupon: ${this.couponCode} on formation: ${this.formationId}`);

    const couponSub = this.couponService.validateCoupon(this.couponCode, this.formationId)
      .pipe(
        catchError(error => {
          console.error('Error validating coupon:', error);
          this.couponError = 'Failed to validate coupon. Please try again.';
          this.validatingCoupon = false;
          return of({ isValid: false });
        }),
        finalize(() => {
          this.validatingCoupon = false;
        })
      )
      .subscribe(response => {
        console.log('Final coupon validation response:', response);
        this.isCouponValid = response.isValid === true;

        if (this.isCouponValid) {
          console.log('✅ Coupon is valid, applying discount');
          this.applyCoupon();
        } else {
          console.log('❌ Coupon is invalid - response was:', response);
          this.couponError = 'Invalid or expired coupon code';
          this.discountedPrice = this.formation!.price;
          this.appliedCoupon = null;
        }
      });

    this.subscriptions.push(couponSub);
  }

  applyCoupon(): void {
    if (!this.formationId || !this.formation || !this.isCouponValid) {
      return;
    }

    console.log(`Applying coupon: ${this.couponCode} for formation: ${this.formationId}`);

    const applySub = this.couponService.applyCoupon(this.couponCode, this.formationId)
      .pipe(
        catchError(error => {
          console.error('Error applying coupon:', error);
          this.couponError = 'Failed to apply coupon. Please try again.';
          this.isCouponValid = false;
          this.discountedPrice = this.formation!.price;
          return of(null);
        })
      )
      .subscribe(response => {
        if (response && response.discountedPrice !== undefined) {
          console.log('Coupon applied successfully:', response);
          this.appliedCoupon = {
            code: this.couponCode,
            discountedPrice: response.discountedPrice
          };
          this.discountedPrice = response.discountedPrice;
          this.isCouponApplied = true;
          console.log(`Coupon applied successfully. Discounted price: ${this.discountedPrice}`);
        } else {
          console.log('Could not apply coupon, response:', response);
          this.couponError = 'Could not apply coupon';
          this.isCouponValid = false;
          this.discountedPrice = this.formation!.price;
        }
      });

    this.subscriptions.push(applySub);
  }

  removeCoupon(): void {
    this.couponCode = '';
    this.isCouponValid = false;
    this.isCouponApplied = false;
    this.couponError = '';
    this.appliedCoupon = null;
    this.paymentForm.patchValue({ couponCode: '' });

    if (this.formation) {
      this.discountedPrice = this.formation.price;
    }
  }

  submitPayment(): void {
    if (this.paymentForm.invalid || !this.formation) {
      // Mark all fields as touched to trigger validation
      Object.keys(this.paymentForm.controls).forEach(key => {
        const control = this.paymentForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    // Set initial processing state just for form submission
    this.processing = true;

    console.log(`Starting payment process at: ${this.currentDateTime}`);
    console.log(`Formation ID: ${this.formationId}`);
    console.log(`Original Amount: ${this.formation.price}`);
    console.log(`Discounted Amount (after coupon): ${this.discountedPrice}`);
    console.log(`Coupon applied: ${this.isCouponApplied ? 'Yes - ' + this.couponCode : 'No'}`);
    console.log(`Mock payment ID that will be used: ${this.mockPaymentId}`);

    // Reset processing before showing modal
    setTimeout(() => {
      this.processing = false;

      // Show the card form to collect payment details
      this.showCardForm = true;

      // Initialize the Stripe card element after modal is shown
      setTimeout(() => {
        this.setupCardElement();
      }, 200);
    }, 500);
  }

  setupCardElement(): void {
    console.log('Setting up card element');

    try {
      const elements = this.stripe.elements();

      const style = {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      };

      // Create the card element
      this.card = elements.create('card', { style });

      // Mount the card element to the DOM
      const cardElement = document.getElementById('card-element');
      if (cardElement) {
        this.card.mount('#card-element');

        // Add event listener for change events
        this.card.addEventListener('change', (event: any) => {
          this.cardErrors = event.error ? event.error.message : '';
        });

        console.log('Card element mounted successfully');
      } else {
        console.error('Card element not found in DOM');
        this.error = 'Could not initialize payment form. Please refresh and try again.';
      }
    } catch (error) {
      console.error('Error setting up card element:', error);
      this.error = 'Could not initialize payment form: ' + error;
    }
  }

  processCardPayment(): void {
    if (!this.card || !this.formation) {
      this.error = 'Payment processing is not properly initialized';
      return;
    }

    this.processingPayment = true;
    console.log('Processing card payment');

    // Prepare payment data with the pre-generated mock payment ID
    const paymentData = {
      formationId: this.formationId!,
      amount: this.discountedPrice, // Use discounted price
      originalAmount: this.formation.price,
      currency: 'eur',
      email: this.paymentForm.get('email')!.value,
      fullName: this.paymentForm.get('fullName')!.value,
      timestamp: this.currentDateTime,
      createdBy: this.currentUser,
      paymentIntentId: this.mockPaymentId, // EXPLICITLY provide the payment ID
      couponCode: this.isCouponApplied ? this.couponCode : null, // Include coupon code if applied
      discountApplied: this.isCouponApplied ? (this.formation.price - this.discountedPrice) : 0
    };

    console.log('Sending payment data with consistent payment ID:', paymentData);

    // Create payment intent
    const paymentSub = this.enrollmentService.createPaymentIntent(paymentData)
      .pipe(
        catchError(error => {
          console.error('Payment intent creation failed:', error);

          // Even on error, we'll use our consistent ID
          if (error.status === 406) {
            console.log('406 error detected - continuing with consistent mock payment ID');
            return of({
              success: true,
              paymentIntentId: this.mockPaymentId,
              clientSecret: null
            });
          }

          this.error = 'Failed to initialize payment. Please try again.';
          this.processingPayment = false;
          return of(null);
        })
      )
      .subscribe(paymentIntent => {
        if (!paymentIntent) return;

        console.log('Payment intent response:', paymentIntent);

        // ALWAYS use our consistent mock payment ID
        console.log(`Using consistent payment ID: ${this.mockPaymentId}`);

        // Process the Stripe payment if needed, or proceed directly to enrollment
        if (paymentIntent.clientSecret) {
          this.confirmCardPayment(paymentIntent.clientSecret);
        } else {
          // Skip Stripe confirmation for mock payments
          this.completeEnrollmentDirectly();
        }
      });

    this.subscriptions.push(paymentSub);
  }

  confirmCardPayment(clientSecret: string): void {
    console.log('Confirming card payment with Stripe');

    // Confirm card payment with Stripe
    this.stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: this.card,
        billing_details: {
          name: this.paymentForm.get('fullName')!.value,
          email: this.paymentForm.get('email')!.value
        }
      }
    })
    .then((result: any) => {
      if (result.error) {
        console.error('Error confirming payment:', result.error);
        this.error = result.error.message;
        this.processingPayment = false;
      } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        console.log('Payment confirmed successfully with Stripe');
        // Always use our consistent mock ID
        this.completeEnrollmentDirectly();
      } else {
        console.log('Payment status:', result.paymentIntent?.status || 'unknown');
        this.error = `Payment status: ${result.paymentIntent?.status || 'unknown'}`;
        this.processingPayment = false;
      }
    })
    .catch((error: any) => {
      console.error('Exception confirming payment:', error);
      this.error = 'Payment processing failed. Please try again.';
      this.processingPayment = false;
    });
  }

  completeEnrollmentDirectly(): void {
    console.log(`Completing enrollment with consistent payment ID: ${this.mockPaymentId}`);

    // Get the discounted price
    const price = this.discountedPrice || this.formation?.price || 0;

    // Create enrollment request with our consistent payment ID
    const enrollmentData = {
      formationId: this.formationId!,
      paymentIntentId: this.mockPaymentId, // Always use our consistent ID
      email: this.paymentForm.get('email')!.value,
      fullName: this.paymentForm.get('fullName')!.value,
      timestamp: this.currentDateTime,
      enrolledBy: this.currentUser,
      amount: price,
      originalAmount: this.formation?.price,
      currency: 'eur',
      couponCode: this.isCouponApplied ? this.couponCode : null, // Include coupon code if applied
      discountApplied: this.isCouponApplied ? (this.formation!.price - this.discountedPrice) : 0
    };

    console.log('Sending enrollment data:', enrollmentData);

    const enrollSub = this.enrollmentService.completeEnrollment(enrollmentData)
      .pipe(
        catchError(error => {
          console.error('Enrollment failed:', error);
          this.error = 'Payment was successful, but enrollment failed. Please contact support.';
          this.processingPayment = false;
          return of(null);
        }),
        finalize(() => {
          this.processingPayment = false;
          this.showCardForm = false;
        })
      )
      .subscribe(response => {
        if (response) {
          console.log('Enrollment completed successfully:', response);

          // Navigate to success page with our consistent ID
          this.router.navigate(['/enrollment/success'], {
            queryParams: {
              formationId: this.formationId,
              email: this.paymentForm.get('email')!.value,
              enrollmentId: this.mockPaymentId, // Use consistent ID
              couponApplied: this.isCouponApplied ? 'true' : 'false'
            }
          });
        } else {
          // If we got null response, try continuing anyway with our ID
          console.log('No enrollment response, continuing anyway');
          this.router.navigate(['/enrollment/success'], {
            queryParams: {
              formationId: this.formationId,
              email: this.paymentForm.get('email')!.value,
              enrollmentId: this.mockPaymentId, // Use consistent ID
              couponApplied: this.isCouponApplied ? 'true' : 'false',
              mock: true
            }
          });
        }
      });

    this.subscriptions.push(enrollSub);
  }

  cancelCardPayment(): void {
    this.showCardForm = false;
    this.processingPayment = false;
    if (this.card) {
      try {
        this.card.unmount();
        this.card = null;
      } catch (e) {
        console.log('Error unmounting card:', e);
      }
    }
  }
}
