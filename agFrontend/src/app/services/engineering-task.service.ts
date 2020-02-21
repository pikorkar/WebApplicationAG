import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EngineeringTask } from '../models/engineering-task';

@Injectable({
  providedIn: 'root'
})
export class EngineeringTaskService {

  constructor(private http: HttpClient) { }

  getAllByUserStory(id: number) {
    return this.http.get<EngineeringTask>(`${environment.apiUrl}/engineeringtask/userstory/${id}`);
  }
}
