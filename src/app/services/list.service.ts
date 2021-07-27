import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { List } from '../my-tasks/list'
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

const baseUrl = 'http://localhost:8080/api/lists'

@Injectable({
  providedIn: 'root'
})
export class ListService {

  lists: List[] = [];
  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) { }

  create(data: List): Observable<any> {
    return this.http.post(baseUrl, data, { headers: this.auth.getAuthHeader()});
  }  

  getLists(): void {
    this.isLoading = true;
    this.http.get<List[]>(baseUrl, { headers: this.auth.getAuthHeader()})
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(
        lists => {
          this.lists = lists;
        },
        error => {
          console.log(error);
          this.snackBar.open('An error occured while retrieving the lists. Please try again later.', null, {duration: 4000});
        }
      );
  }


}
