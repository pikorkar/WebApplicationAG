import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Project[]>(`${environment.apiUrl}/project`);
  }

  create(project: Project) {
    return this.http.post(`${environment.apiUrl}/project/create`, project);
  }

  getById(id: number) {
    return this.http.get<Project>(`${environment.apiUrl}/project/${id}`);
  }
}
