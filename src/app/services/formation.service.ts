import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {FormationCourse, Formation, User} from "../models/Model";

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = 'http://localhost:8085/api/formations';

  constructor(private http: HttpClient) { }

  getAllFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(this.apiUrl);
  }

  getFormationById(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.apiUrl}/${id}`);
  }

  createFormation(formation: Formation): Observable<Formation> {
    return this.http.post<Formation>(this.apiUrl, formation);
  }

  updateFormation(id: number, formation: Formation): Observable<Formation> {
    return this.http.put<Formation>(`${this.apiUrl}/${id}`, formation);
  }

  deleteFormation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  assignUsersToFormation(id: number, users: User[]): Observable<Formation> {
    return this.http.post<Formation>(`${this.apiUrl}/assignusers/${id}`, users);
  }

  assignCoursesToFormation(id: number, courses: FormationCourse[]): Observable<Formation> {
    return this.http.post<Formation>(`${this.apiUrl}/assigncourses/${id}`, courses);
  }
}
