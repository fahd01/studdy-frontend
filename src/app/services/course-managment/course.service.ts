import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {PaginatedResponse} from "../../models/paginated-response.model";
import {Course} from "../../models/Course.model";

// TODO use .env for configuring API urls
const courseManagementApiProxyTarget = '/course-management'

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) {}

  public get(id: number): Observable<Course> {
    return this.http.get<Course>(`${courseManagementApiProxyTarget}/courses/${id}`);
  }

  public create(course: Course): Observable<any> {
    return this.http.post(`${courseManagementApiProxyTarget}/courses`, course)
  }

  public update(course: Course): Observable<any> {
    return this.http.put(`${courseManagementApiProxyTarget}/courses`, course)
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${courseManagementApiProxyTarget}/courses/${id}`);
  }

  public fetchCourseDetails(id: number): Observable<Course> {
    return this.http.get<Course>(`${courseManagementApiProxyTarget}/courses/${id}`);
  }

  public fetchAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${courseManagementApiProxyTarget}/courses`);
  }

  public fetchAllCoursesPaged(): Observable<PaginatedResponse<Course>> {
    return this.http.get<PaginatedResponse<Course>>(`${courseManagementApiProxyTarget}/courses/paged`);
  }
}



