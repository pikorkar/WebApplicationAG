import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EngineeringTask } from '../model/engineering-task';
import { Status } from '../model/status';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class EngineeringTaskService {

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService) { }

  getAllByUserStory(id: number) {
    return this.http.get<EngineeringTask[]>(`${environment.apiUrl}/engineeringtask/userstory/${id}`);
  }

  create(engineeringTask: EngineeringTask) {
    engineeringTask.status = Status.New;
    engineeringTask.userStoryId = Number(engineeringTask.userStoryId);
    engineeringTask.userId = this.authenticationService.currentUserValue.id;
    return this.http.post(`${environment.apiUrl}/engineeringtask/create`, engineeringTask);
  }

  update(id: number, engineeringTask: EngineeringTask) {
    engineeringTask.userStoryId = Number(engineeringTask.userStoryId);
    engineeringTask.userId = Number(engineeringTask.userId);
    return this.http.put(`${environment.apiUrl}/engineeringtask/${id}`, engineeringTask);
  }

  getById(id: number) {
    return this.http.get<EngineeringTask>(`${environment.apiUrl}/engineeringtask/${id}`);
  }
}
