import { Component } from '@angular/core';
import {Course} from "../../../../models/Course.model";
import {CourseService} from "../../../../services/course-managment/course.service";

@Component({
  selector: 'app-table-view',
  templateUrl: './course-table-view.component.html',
  styleUrls: ['./course-table-view.component.css']
})
export class CourseTableViewComponent {
  courses: Course[] = [];
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourse();
  }

  public loadCourse() {
    this.courseService.fetchAllCourses().subscribe({
      next: data => this.courses = data,
      error: error => console.error('Error fetching courses table-view:', error)
    });
  }

  public deleteCourse(course: Course) {
    // TODO implement bootstrap modal
    // https://stackoverflow.com/questions/41684114/easy-way-to-make-a-confirmation-dialog-in-angular
    if(confirm(`Are you sure you want to delete '${course.title}' course`)) {
      this.courseService.delete(course.id!).subscribe({
        // TODO notification
        // https://www.npmjs.com/package/angular-notifier
        next: () => this.loadCourse(),
        error: error => console.log("error deleting course")
      });
    }
  }

  levelBadgeClass(level: string){
    switch(level){
      case "BEGINNER": return "badge-success";
      case "INTERMEDIATE": return "badge-warning";
      case "ADVANCED": return "badge-danger";
      default: return "badge-info";
    }
  }

}
