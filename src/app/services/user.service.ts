import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';

const baseUrl = 'http://localhost:8080/api/user'

export interface User {
  id: string,
  email: string,
  username: string,
  nickname?: string,
  fullName?: string
  exp: number,
  iat: number,
  preferences: UserPreferences
}

export interface UserPreferences {
  defaultList: {
    id: string,
    name: string
  }
}

export interface UpdateUserPayload {
  fullName: string,
  nickname: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) { }

  public get(id: string): Observable<any> {
    const url = `${baseUrl}/${id}`;
    const options = {headers: this.auth.getAuthHeader()};
    return this.http.get(
      url, 
      options
    );
  }

  public update(payload: UpdateUserPayload, user: User): Observable<any> {
    const url = `${baseUrl}/${user.id}`;
    const options = { headers: this.auth.getAuthHeader()};
    return this.http.put(
      url, 
      payload, 
      options
    );
  }

  public delete(password: string, user: User): Observable<any> {
    const method = 'delete';
    const url = `${baseUrl}/${user.id}`;
    const body = {
      username: user.username,
      password: password
    };
    const options = {
      body: body,
      headers: this.auth.getAuthHeader()
    };
    return this.http.request(
      method,
      url, 
      options
    );
  }
  
}
