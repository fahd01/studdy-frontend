import {Component, OnInit} from '@angular/core';
import {CourseService} from "../../../../services/course-managment/course.service";

@Component({
  selector: 'course-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  courses: any;
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.fetchAllCourses().subscribe( // TODO subscribe is deprecated
        (data) => {this.courses = data; console.log(this.courses)},
        (error) => console.error('Error fetching courses list:', error)
    );
  }

}
