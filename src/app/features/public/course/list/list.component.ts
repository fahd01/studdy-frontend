import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {Course} from "../../../../models/Course.model";
import {CourseService} from "../../../../services/course-managment/course.service";
import {RouterLink} from "@angular/router";
import {Category} from "../../../../models/Category.model";
import {debounceTime} from "rxjs";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PaginatedResponse} from "../../../../models/paginated-response.model";

@Component({
  selector: 'course-table-view',
  standalone: true,
    imports: [
        NgForOf,
        RouterLink,
        ReactiveFormsModule,
        NgClass,
        FormsModule
    ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  coursePages!: PaginatedResponse<Course>;
  categories: Category[] = [];
  constructor(private courseService: CourseService) {
      this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(value => {
          this.searchQuery = value!
          this.loadCourses();
      });
  }

  ngOnInit(): void {
      this.loadCourses();
      this.loadCategories();
  }

  loadCourses(page: number = 0) {
      this.courseService.filterCourses(this.selectedCategories, this.selectedLevels, this.searchQuery, this.myEnrolledCourses, page).subscribe({
          next: data => this.coursePages = data,
          error: error => console.error('Error fetching courses', error)
      });
  }

  loadCategories(){
      this.courseService.fetchAllCategories().subscribe({
          next: data => this.categories = data,
          error: error => console.error('Error fetching courses table-view:', error)
      });
  }

  /*** Filtering ****/
    searchControl = new FormControl('');
    searchQuery:string = "";
    selectedCategories: number[] = [];
    selectedLevels: string[] = [];
    myEnrolledCourses: boolean = false;

    onMyEnrolledCoursesChange(event: any) {
        this.myEnrolledCourses = event.target.checked
        this.loadCourses();
    }

    onCategoryChange(event: Event, categoryId: number) {
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) { this.selectedCategories.push(categoryId); }
        else { this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);}
        this.loadCourses();
    }

    onLevelChange(event: Event, level: string) {
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) { this.selectedLevels.push(level); }
        else { this.selectedLevels = this.selectedLevels.filter(l => l !== level); }
        this.loadCourses();
    }

    levelBadgeClass(level: string){
        switch(level){
            case "BEGINNER": return "badge-success";
            case "INTERMEDIATE": return "badge-warning";
            case "ADVANCED": return "badge-danger";
            default: return "badge-info";
        }
    }

    nextPage() {
        if (this.coursePages.last) return;
        this.loadCourses(this.coursePages.number + 1)
    }

    previousPage(){
        if (this.coursePages.first) return;
        this.loadCourses(this.coursePages.number - 1)
    }
}
