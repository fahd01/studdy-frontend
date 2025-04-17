import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Course} from "../../../model/Model";

// TODO use .env for configuring API urls
const courseManagementApiProxyTarget = '/course-management'

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  apiUrl ="http://localhost:8085/api/course"


  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl);
  }

}

