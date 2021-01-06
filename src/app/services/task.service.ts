import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { Task } from '../tasks/task';
import { TASKS } from '../mock-tasks';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/tasks'

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  // getTasks(): Observable<Task[]> {
  //   return of(TASKS);
  // }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id: String): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: String, data): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: String): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByName(name: String): Observable<any> {
    return this.http.get(`${baseUrl}?name=${name}`);
  }
}
