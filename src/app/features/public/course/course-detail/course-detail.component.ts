import { Component } from '@angular/core';
import {CourseService} from "../../../../services/course-managment/course.service";
import {Course} from "../../../../models/Course.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent {
  course!: Course;
  isEnrolled: boolean = false

  constructor(private courseService: CourseService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(id)
    this.courseService.fetchCourseDetails(id).subscribe({
        next: data => this.course = data,
        error: error => console.error('Error fetching course detail:', error)
    });

    this.courseService.isEnrolled(id).subscribe({
      next: data => {if(data) this.isEnrolled = true},
      error: error => console.error("Error fetching is enrolled")
    })
  }

  enroll(courseId: number) {
    this.courseService.enroll(courseId).subscribe({
      next: data => console.log(`Current user successfully enrolled to course ${courseId}`),
      error: error => console.error("Error enrolling to course", error)
    })
  }

}
