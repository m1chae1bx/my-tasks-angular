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

  // getAll(): Observable<any> {
  //   return this.http.get(baseUrl);
  // }

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

  find(
    name: String,
    completed: Boolean,
    dueDate: String
  ): Observable<any> {
    var request = `${baseUrl}`;
    var prefix = '?';
    if (name) {
      request = request + prefix + `name=${name}`;
      prefix = '&';
    };
    if (completed != null) {
      request = request + prefix + `completed=${completed}`;
      prefix = '&';
    }
    if (dueDate) {
      var today = new Date();
      // today.setHours(0,0,0,0);
      today.setUTCHours(0,0,0,0);
      console.log(today.toISOString());
      request = request + prefix + `dueDate=${dueDate}&today=${today.toISOString()}`;
      prefix = '&';
    }
    console.log('request', request);
    return this.http.get(request);
  }
}
