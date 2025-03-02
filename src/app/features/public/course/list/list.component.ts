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
          this.searchQuery = value!
          this.loadCourses();
      });
  }

  ngOnInit(): void {
      this.loadCourses();
      this.loadCategories();
  }

  loadCourses() {
      /* TODO implement paging */
      this.courseService.filterCourses(this.selectedCategories, this.selectedLevels, this.searchQuery).subscribe({
          next: data => this.courses = data,
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
}
