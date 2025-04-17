import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiEndpoints} from "./api-endpoints";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  upload(courseId: number, moduleId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${ApiEndpoints.COURSE_MANAGEMENT_API_PATH}/courses/${courseId}/modules/${moduleId}/upload`, formData);
  }

  // Formation management part
  private apiUrl = 'http://localhost:8085/api/upload';
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(`${this.apiUrl}/image`, formData);
  }
}
