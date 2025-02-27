import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Course} from "../../../../models/Course.model";
import {CourseService} from "../../../../services/course-managment/course.service";
import {RouterLink} from "@angular/router";
import {Category} from "../../../../models/Category.model";
import {debounceTime} from "rxjs";
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'course-table-view',
  standalone: true,
    imports: [
        NgForOf,
        RouterLink,
        ReactiveFormsModule
    ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  courses: Course[] = [];
  categories: Category[] = [];
  constructor(private courseService: CourseService) {
      this.searchControl.valueChanges.pipe(debounceTime(300)).subscribe(value => {
          console.log('Search text:', value);
      });
  }

  ngOnInit(): void {
    /* TODO implement paging
    this.courseService.fetchAllCoursesPaged().subscribe({
      next: data => console.log(data),
      error: error => console.error('Error fetching paged courses', error)
    })
     */
    this.courseService.fetchAllCourses().subscribe({
        next: data => this.courses = data,
        error: error => console.error('Error fetching courses', error)
    });
    this.courseService.fetchAllCategories().subscribe({
        next: data => this.categories = data,
        error: error => console.error('Error fetching courses table-view:', error)
    });
  }

  /*** Filtering ****/
    searchControl = new FormControl('');
    selectedCategories: number[] = [];
    selectedLevels: string[] = [];
    onCategoryChange(event: Event, categoryId: number) {
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            this.selectedCategories.push(categoryId);
        } else {
            this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
        }

        console.log(this.selectedCategories)
    }

    onLevelChange(event: Event, level: string) {
        const isChecked = (event.target as HTMLInputElement).checked;
        if (isChecked) {
            this.selectedLevels.push(level);
        } else {
            this.selectedLevels = this.selectedLevels.filter(l => l !== level);
        }

        console.log(this.selectedLevels)
    }
}
