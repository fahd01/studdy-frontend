import {Component, OnInit} from '@angular/core';
import {Course, CourseService} from "../../../../services/course-managment/course.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'course-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  courses: Course[] = [];
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.fetchAllCourses().subscribe({// TODO subscribe is deprecated
        next: data => this.courses = data,
        error: error => console.error('Error fetching courses list:', error)
    });
  }

}
