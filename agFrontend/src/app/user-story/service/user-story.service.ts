import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserStory } from '../model/user-story';

@Injectable({
  providedIn: 'root'
})
export class UserStoryService {

  constructor(private http: HttpClient) { }

  getAllBySprint(id: number) {
    return this.http.get<UserStory[]>(`${environment.apiUrl}/userstory/sprint/${id}`);
  }

  create(userStory: UserStory) {
    userStory.sprintId = Number(userStory.sprintId);
    return this.http.post(`${environment.apiUrl}/userstory/create`, userStory);
  }

  getAllByProject(id: number) {
    return this.http.get<UserStory[]>(`${environment.apiUrl}/userstory/project/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/userstory/${id}`);
  }

  update(id: number, userStory: UserStory) {
    userStory.sprintId = Number(userStory.sprintId);
    return this.http.put(`${environment.apiUrl}/userstory/${id}`, userStory);
  }

  getById(id: number) {
    return this.http.get<UserStory>(`${environment.apiUrl}/userstory/${id}`);
  }
}
