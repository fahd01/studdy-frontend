import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Course} from "../../../../models/Course.model";
import {CourseService} from "../../../../services/course-managment/course.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'course-list',
  standalone: true,
    imports: [
        NgForOf,
        RouterLink
    ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  courses: Course[] = [];
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.fetchAllCoursesPaged().subscribe({
      next: data => console.log(data),
      error: error => console.error('Error fetching courses list:', error)
    })
    this.courseService.fetchAllCourses().subscribe({// TODO subscribe is deprecated
        next: data => this.courses = data,
        error: error => console.error('Error fetching courses list:', error)
    });
  }

}
