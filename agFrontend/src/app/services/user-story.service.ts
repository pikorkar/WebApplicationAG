import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserStory } from '../models/user-story';

@Injectable({
  providedIn: 'root'
})
export class UserStoryService {

  constructor(private http: HttpClient) { }

  getAllBySprint(id: number) {
    return this.http.get<UserStory[]>(`${environment.apiUrl}/userstory/sprint/${id}`);
  }

  create(userStory: UserStory, sprintId: number) {
    userStory.sprintId = sprintId;
    return this.http.post(`${environment.apiUrl}/userstory/create`, userStory);
  }
}
