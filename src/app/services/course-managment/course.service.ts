import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {PaginatedResponse} from "../../models/paginated-response.model";
import {Course} from "../../models/Course.model";
import {Category} from "../../models/Category.model";

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

  /***** Categories *******/
  public fetchAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${courseManagementApiProxyTarget}/categories`);
  }

  public createCategory(category: Category): Observable<any> {
    return this.http.post(`${courseManagementApiProxyTarget}/categories`, category)
  }

  public deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${courseManagementApiProxyTarget}/categories/${id}`);
  }

  public getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${courseManagementApiProxyTarget}/categories/${id}`);
  }
}



