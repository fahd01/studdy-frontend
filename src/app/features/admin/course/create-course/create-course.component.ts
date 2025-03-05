import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Course} from "../../../../models/Course.model";
import {CourseService} from "../../../../services/course-managment/course.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../../../../models/Category.model";
import {dateComparator} from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools";


@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit{

  id?: number;
  courseForm!: FormGroup
  courseToEdit!: Course
  categories!: Category[]
  page = {
    title: "Create Course",
    breadcrumb: "Create",
    cardTitle: "Course Creation Form",
    cardDescription: "Fill details for your course"
  }

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private courseService: CourseService
  ) {}

  ngOnInit(){
    this.id = this.activatedRoute.snapshot.params['id'];
    this.courseService.fetchAllCategories().subscribe({
      next: data => this.categories = data,
      error: error => console.log("error fetching categories")
    })
    this.courseForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
      duration: new FormControl<number>(7, [Validators.required, Validators.min(1)]),
      price: new FormControl<number>(50, [Validators.required, Validators.min(1)]),
      category: new FormControl<Category | null>(null, Validators.required),
    });

    if (this.id) {
      // edit mode
      this.page.title = "Edit Course"
      this.page.breadcrumb = "Edit"
      this.page.cardTitle = "Course Editing Form"
      this.page.cardDescription = "Adjust details for your course"

      this.courseService.get(this.id).subscribe(course=> {this.courseToEdit = course; this.courseForm.patchValue(course)});
    }
  }


  public saveCourse() {
    let course = {
      ... this.courseForm.value,
      id: this.id ? this.id : null ,
      status: this.id ? this.courseToEdit.status : 'PUBLISHED',
      // TODO use AI to generate
      thumbnailUrl: this.id ? this.courseToEdit.thumbnailUrl : null,
    } as Course

    let response = this.id ? this.courseService.update(course) : this.courseService.create(course)

    response.subscribe({
      // TODO notification
      next: () => this.router.navigate(['/admin/course/table-view']),
      error: error => console.error("error creating course")
    })
  }

  compareCategories(category1: Category, category2: Category) {
    return category1 && category2 && category1.id === category2.id;
  }
}
