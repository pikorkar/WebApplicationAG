import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/user`);
  }

  getById(id: number) {
    return this.http.get<User>(`${environment.apiUrl}/user/${id}`);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/user/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/user/${id}`);
  }

  update(id: number, user: User) {
    return this.http.put(`${environment.apiUrl}/user/${id}`, user);
  }
}
