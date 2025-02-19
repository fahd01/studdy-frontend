import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

// TODO use .env for configuring API urls
const courseManagementApiProxyTarget = '/course-management'

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {}

  public fetchAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${courseManagementApiProxyTarget}/courses`);
  }
}

// TODO move to a separate file ??
export class Course {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  status: string;
  price: number;
  duration: number;
  level: string;
  category: Category;


  constructor(id: number, title: string, description: string, thumbnailUrl: string, status: string, price: number, duration: number, level: string, category: Category) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.thumbnailUrl = thumbnailUrl;
    this.status = status;
    this.price = price;
    this.duration = duration;
    this.level = level;
    this.category = category;
  }
}

export class Category {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

