import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { List } from '../my-tasks/list'

const baseUrl = 'http://localhost:8080/api/lists'

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  create(data: List): Observable<any> {
    return this.http.post(baseUrl, data, { headers: this.auth.getAuthHeader()});
  }  


}
