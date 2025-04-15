import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Blog, BlogService, Suggestion } from './blog.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { filter } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../../admin/notification.service';
 
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0%)' }))
      ])
    ])
  ]
})
export class BlogComponent implements OnInit  {

  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 6; // Number of blogs per page

  blogForm: FormGroup;
  blogs: Blog[] = [];

  editMode = false;
  currentBlogId: number | null = null;
  searchTerm: string = '';
  suggestions:Suggestion[]=[];
  suggestionIndex=0;
  
   constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private blogService: BlogService,
              private notificationService: NotificationService,
              private router: Router) { 
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', Validators.required],
      content: ['', Validators.required]
    });
  }
  modalInstance: any;

  ngOnInit(): void {
    
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    this.getAllBlogs(0);

  }
  getAllBlogs(page: number): void {
    this.blogService.getAllBlogs(page, this.pageSize, this.searchTerm).subscribe(data => {
      this.blogs = data.content;
      this.totalPages = data.totalPages;
      this.currentPage = data.number;
    }, (error: HttpErrorResponse) => {
      console.error('Error loading blogs:', error);
    });
  }

  searchBlogs(): void {
    this.getAllBlogs(0);
  }

  viewBlogDetails(id: number): void {
    this.router.navigate(['/blogs', id]).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  goToPage(page: number, event: Event): void {
    event.preventDefault();
    if (page >= 0 && page < this.totalPages) {
      this.getAllBlogs(page);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      if (this.editMode && this.currentBlogId) {
        this.blogService.updateBlog(this.currentBlogId, this.blogForm.value).subscribe(
          () => {
            this.getAllBlogs(this.currentPage);
            this.resetForm();
          },
          (error: HttpErrorResponse) => {
            console.error('Error updating blog:', error);
          }
        );
      } else {
        this.blogService.createBlog(this.blogForm.value).subscribe(
          () => {
            this.getAllBlogs(this.currentPage);
            this.resetForm();
          },
          (error) => {
            console.error('Error creating blog:', error);
          }
        );
      }
    }
  }

  editBlog(blog: Blog): void {
    this.editMode = true;
    this.currentBlogId = blog.id;
    this.blogForm.patchValue({
      title: blog.title,
      author: blog.author,
      content: blog.content
    });
  }

  deleteBlog(id: number): void {
    if (confirm('Are you sure you want to delete this blog post?')) {
      this.blogService.deleteBlog(id).subscribe(
        () => {
          this.getAllBlogs(this.currentPage);
        },
        (error) => {
          console.error('Error deleting blog:', error);
        }
      );
    }
  }

  cancelEdit(): void {
    this.resetForm();
  }

  private resetForm(): void {
    this.editMode = false;
    this.currentBlogId = null;
    this.blogForm.reset();
  }

  postBlog(blogData: any) {
    this.blogService.createBlog(blogData).subscribe((response) => {
      this.notificationService.notifyNewBlog(response);
    });
  }
  loadSuggestions(){
    this.blogService.loadSuggestion({
      title: this.blogForm.get('title')?.value||"", // Corrected form control value access
      description: this.blogForm.get('content')?.value||"", // Corrected form control value access
    }).subscribe(suggestions => {
      this.suggestions = suggestions; // Assuming this loads suggestions from the service
    });
  }
  ignoreSuggestion() {
    if (this.suggestionIndex < this.suggestions.length - 1) {
      this.suggestionIndex++;
    } else {
      this.closeModal();
    }
  }

  // Method to choose a suggestion
  choiceSuggestion(index: number) {
    this.blogForm.patchValue({
      title: this.suggestions[index].title, // Use patchValue to update specific fields
      content: this.suggestions[index].description
    });
    this.closeModal();
  }
  openSuggestion(){
    this.loadSuggestions();

  }
  closeModal(){
    document.getElementById("closeModalSuggestion")?.click()
  }
}