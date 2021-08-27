import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { FiltersService } from './filters.service';
import { Task } from '../my-tasks/task';

const baseUrl = 'http://localhost:8080/api/lists'

@Injectable()
export class TaskService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private filtersService: FiltersService
  ) { }

  // get(id: String): Observable<any> {
  //   return this.http.get(`${baseUrl}/${id}`, { headers: this.auth.getAuthHeader()});
  // }

  create(data: Partial<Task>): Observable<any> {
    return this.http.post(`${baseUrl}/${data.listId}/tasks`, data, { headers: this.auth.getAuthHeader()});
  }

  update(id: String, data): Observable<any> { // @todo fix typing for data
    return this.http.put(`${baseUrl}/${data.listId}/tasks/${id}`, data, { headers: this.auth.getAuthHeader()});
  }

  delete(id: String, listId: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${listId}/tasks/${id}`, { headers: this.auth.getAuthHeader()});
  }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(baseUrl);
  // }

  find(
    id: string,
    name: String,
    completed: Boolean,
    dueDate: String,
    listId: string
  ): Observable<any> {
    var request = `${baseUrl}/${listId}/tasks`;
    var prefix = '?';
    if (id) {
      request = request + prefix + `id=${id}`;
      prefix = '&';
    }
    if (name) {
      request = request + prefix + `name=${name}`;
      prefix = '&';
    };
    if (completed) {
      request = request + prefix + `includeCompleted=${completed}`;
      prefix = '&';
    }
    if (dueDate) {
      var today = new Date();
      today.setHours(0,0,0,0);
      console.log(today.toISOString());
      request = request + prefix + `dueDate=${dueDate}&today=${today.toISOString()}`;
      prefix = '&';
    }
    console.log('request', request);
    return this.http.get(request, { headers: this.auth.getAuthHeader()});
  }
}
