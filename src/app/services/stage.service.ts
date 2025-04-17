import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stage } from '../models/Stage';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  constructor(private http: HttpClient) { }


  getStages() { 
    return this.http.get<Stage[]>('http://localhost:8080/stages');
  }

  addStage(stage: Stage) {  
    return this.http.post<Stage>('http://localhost:8080/stages', stage);
  }

  getStageById(id: number) {  
    return this.http.get<Stage>('http://localhost:8080/stages/' + id);
  }


  updateStage(id: number, stage: Stage) {
    return this.http.put<Stage>('http://localhost:8080/stages/' + id, stage);
  }

  deleteStage( id : number) {
    return this.http.delete('http://localhost:8080/stages/' + id);
  }



}
