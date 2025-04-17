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
  completedModules: number[] = []
  completionProgress: number = 0
  isEnrolled: boolean = false
  enrollmentDate: string | null = null

  constructor(private courseService: CourseService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(id)
    this.courseService.fetchCourseDetails(id).subscribe({
        next: data => this.course = data,
        error: error => console.error('Error fetching course detail:', error)
    });

    this.courseService.isEnrolled(id).subscribe({
      next: data => {if(data) this.isEnrolled = true; this.enrollmentDate = new Date(data['enrollmentDate']).toLocaleDateString()},
      error: error => console.error("Error fetching is enrolled")
    })

    this.courseService.getCompletedModules(id).subscribe({
      next: data => this.completedModules = data,
      error: error => console.error("Error fetching completed modules")
    })

    this.courseService.getCompletionProgress(id).subscribe({
      next: data => this.completionProgress = data,
      error: error => console.error("Error fetching completed modules")
    })
  }

  enroll(courseId: number) {
    this.courseService.enroll(courseId).subscribe({
      next: data => console.log(`Current user successfully enrolled to course ${courseId}`),
      error: error => console.error("Error enrolling to course", error)
    })
  }

  activeModule = 0
  showModuleDetails(moduleId: number) {
    this.activeModule = moduleId
  }

  nextModuleIdToAttend(): number | null | undefined {
    return this.course.modules
        ?.map(module => module.id)
        .filter(id => !this.completedModules.includes(id!))
        .shift()
  }

  progressBarBackgroundStyle(): string {
    switch (true) {
      case this.completionProgress < 30:
        return 'progress-bar bg-danger';
      case this.completionProgress < 70:
        return 'progress-bar bg-warning';
      case this.completionProgress >= 70:
        return 'progress-bar bg-info';
      default:
        return 'progress-bar bg-success';
    }
  }
}
