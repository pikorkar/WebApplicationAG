import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Sprint } from '../models/sprint';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Sprint[]>(`${environment.apiUrl}/sprint`);
  }

}
