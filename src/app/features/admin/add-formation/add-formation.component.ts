import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Course, Formation, User } from "../../../../model/Model";
import { FormationService } from "../../../services/formation.service";
import { UserService } from "../../../services/user.service";
import { CourseService } from "../../../services/course-managment/course.service";
import { FileUploadService } from "../../../services/file-upload.service";

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent implements OnInit {
  formationForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    imagesUrls: this.fb.array([]),
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0)]],
    participants: [[]],
    coursesList: [[]]
  });

  users: User[] = [];
  courses: Course[] = [];
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  selectedFiles: File[] = [];
  uploadProgress: number[] = [];
  previewUrls: { [key: string]: string } = {}; // Store preview URLs for files

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private formationService: FormationService,
      private userService: UserService,
      private courseService: CourseService,
      private fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadCourses();
  }

  get imagesUrlsArray(): FormArray {
    return this.formationForm.get('imagesUrls') as FormArray;
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers()
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: (users) => this.users = users,
          error: (error) => {
            console.error('Error loading users', error);
            this.errorMessage = 'Failed to load users.';
          }
        });
  }

  loadCourses(): void {
    this.isLoading = true;
    this.courseService.getAllCourses()
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: (courses) => this.courses = courses,
          error: (error) => {
            console.error('Error loading courses', error);
            this.errorMessage = 'Failed to load courses.';
          }
        });
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (this.isValidImageFile(file)) {
          this.selectedFiles.push(file);
          this.uploadProgress.push(0);
          this.createImagePreview(file);
        } else {
          this.errorMessage = 'Only image files are allowed (jpg, jpeg, png, gif).';
        }
      }
    }
  }

  isValidImageFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg','images/webp'];
    return validTypes.includes(file.type);
  }

  createImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrls[file.name] = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  getFilePreviewUrl(file: File): string {
    return this.previewUrls[file.name] || '';
  }

  uploadImages(): Promise<string[]> {
    if (this.selectedFiles.length === 0) {
      return Promise.resolve([]);
    }

    const uploadPromises = this.selectedFiles.map((file, index) => {
      return new Promise<string>((resolve, reject) => {
        this.uploadProgress[index] = 0;

        this.fileUploadService.uploadImage(file)
            .subscribe({
              next: (response) => {
                this.uploadProgress[index] = 100;
                console.log('Image uploaded successfully:', response);
                resolve(response.imageUrl);
              },
              error: (error) => {
                console.error('Error uploading image', error);
                reject(error);
              }
            });
      });
    });

    return Promise.all(uploadPromises);
  }

  removeSelectedFile(index: number): void {
    const file = this.selectedFiles[index];
    delete this.previewUrls[file.name];
    this.selectedFiles.splice(index, 1);
    this.uploadProgress.splice(index, 1);
  }

  async onSubmit(): Promise<void> {
    if (this.formationForm.invalid) {
      this.markFormGroupTouched(this.formationForm);
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    try {
      // Upload images first
      const imageUrls = await this.uploadImages();

      // Add image URLs to the form data
      const formationData: Formation = this.formationForm.value;
      formationData.imagesUrls = imageUrls;

      // Format dates
      formationData.startDate = new Date(formationData.startDate);
      formationData.endDate = new Date(formationData.endDate);

      // Handle courses - only include IDs to avoid detached entity issues
      if (formationData.coursesList && formationData.coursesList.length > 0) {
        formationData.coursesList = formationData.coursesList.map(course => ({
          id: course.id,
          name: course.name
        }));
      }

      // Handle participants - only include IDs
      if (formationData.participants && formationData.participants.length > 0) {
        formationData.participants = formationData.participants.map(user => ({
          id: user.id,
          name: user.name,
          email: user.email
        }));
      }

      console.log('Submitting formation with data:', formationData);

      // Submit the formation
      this.formationService.createFormation(formationData)
          .pipe(finalize(() => this.isSubmitting = false))
          .subscribe({
            next: (response) => {
              console.log('Formation created successfully', response);
              this.router.navigate(['/course/list']);
            },
            error: (error) => {
              console.error('Error creating formation', error);
              this.errorMessage = 'Failed to create formation: ' +
                  (error.error?.message || 'Unknown error occurred');
            }
          });
    } catch (error) {
      this.isSubmitting = false;
      this.errorMessage = 'Failed to upload images. Please try again.';
      console.error('Error during submission', error);
    }
  }
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Method used by [compareWith] directive
  compareById(item1: any, item2: any): boolean {
    return item1 && item2 && item1.id === item2.id;
  }
}