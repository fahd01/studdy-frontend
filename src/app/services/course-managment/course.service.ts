import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {PaginatedResponse} from "../../models/paginated-response.model";
import {Course} from "../../models/Course.model";
import {Category} from "../../models/Category.model";
import {AuthenticationService} from "../Authenticarion.service";
import {Module} from "../../models/Module.model";
import {ApiEndpoints} from "../api-endpoints";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
      private http: HttpClient,
      private authenticationService: AuthenticationService
  ) {}

  public get(id: number): Observable<Course> {
    return this.http.get<Course>(`${ApiEndpoints.COURSE_MANAGEMENT_API_PATH}/courses/${id}`);
  }

  public create(course: Course): Observable<any> {
    return this.http.post(`${ApiEndpoints.COURSE_MANAGEMENT_API_PATH}/courses`, course)
  }

  public update(course: Course): Observable<any> {
    return this.http.put(`${ApiEndpoints.COURSE_MANAGEMENT_API_PATH}/courses`, course)
  }

  public delete(id: number): Observable<any> {
    return this.http.delete(`${ApiEndpoints.COURSE_MANAGEMENT_API_PATH}/courses/${id}`);
  }

  public fetchCourseDetails(id: number): Observable<Course> {
    return this.http.get<Course>(`${ApiEndpoints.COURSE_MANAGEMENT_API_PATH}/courses/${id}`);
  }

  public filterCourses(
      categoryIds: number[],
      levels: string[],
      searchQuery: string,
      onlyEnrolledCourses: boolean = false,
      page: number = 0,
      size: number = 6
  ): Observable<PaginatedResponse<Course>> {
    let currentUserId = this.authenticationService.getCurrentUser()?.id;
    console.log(currentUserId)
    console.log(onlyEnrolledCourses)
    let enrolledUserId:string = currentUserId && onlyEnrolledCourses ? String(currentUserId) : ''
    let queryParameters = `categoryId=${categoryIds.join(",")}&level=${levels.join(",")}&query=${searchQuery}&enrolledUserId=${enrolledUserId}&page=${page}&size=${size}`
    return this.http.get<PaginatedResponse<Course>>(`${ApiEndpoints.COURSE_MANAGEMENT_API_PATH}/courses/filter?${queryParameters}`);
  }

  public fetchAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${ApiEndpoints.COURSE_MANAGEMENT_API_PATH}/courses`);
  }

  public enroll(courseId: number): Observable<any> {
    let currentUserId = this.authenticationService.getCurrentUser()?.id;
    return this.http.post(`${ApiEndpoints.COURSE_MANAGEMENT_API_PATH}/courses/${courseId}/users/${currentUserId}`, null);
  }

  public isEnrolled(courseId: number): Observable<any> {
    let currentUserId = this.authenticationService.getCurrentUser()?.id;
    return this.http.get(`${ApiEndpoints.COURSE_MANAGEMENT_API_PATH}/courses/${courseId}/users/${currentUserId}/enrollments`)
  }

  /***** Modules **********/
  public getModules(courseId: number): Observable<Module[]> {
    return this.http.get<Module[]>(`${ApiEndpoints.COURSE_MANAGEMENT_API_PATH}/courses/${courseId}/modules`)
  }

  public saveModule(courseId: number, module: Module): Observable<Module> {
    return this.http.post<Module>(`${ApiEndpoints.COURSE_MANAGEMENT_API_PATH}/courses/${courseId}/modules`, module)
  }

  public deleteModule(courseId: number, moduleId: number): Observable<any> {
    return this.http.delete(`${ApiEndpoints.COURSE_MANAGEMENT_API_PATH}/courses/${courseId}/modules/${moduleId}`)
  }

  /***** Categories *******/
  public fetchAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${ApiEndpoints.COURSE_MANAGEMENT_API_PATH}/categories`);
  }

  public createCategory(category: Category): Observable<any> {
    return this.http.post(`${ApiEndpoints.COURSE_MANAGEMENT_API_PATH}/categories`, category)
  }

  public deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${ApiEndpoints.COURSE_MANAGEMENT_API_PATH}/categories/${id}`);
  }

  public getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${ApiEndpoints.COURSE_MANAGEMENT_API_PATH}/categories/${id}`);
  }

  /******* Statistics ************/
  public getStatistics(): Observable<any> {
    return this.http.get(`${ApiEndpoints.COURSE_MANAGEMENT_API_PATH}/courses/statistics`);
  }
}



