import { Component } from '@angular/core';
import {CourseService} from "../../../../services/course-managment/course.service";
import {Course} from "../../../../models/Course.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent {
  course!: Course;
  constructor(private courseService: CourseService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id)
    this.courseService.fetchCourseDetails(Number(id)).subscribe({
        next: data => this.course = data,
        error: error => console.error('Error fetching course detail:', error)
    });
  }
}
