import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from '../../services/notifier.service'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../task';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.scss']
})
export class SearchTaskComponent implements OnInit, OnDestroy {

  task: Task = {
    id: null,
    name: '',
    desc: '',
    dueDate: null,
    isCompleted: false,
    listId: ''
  };
  filtered: boolean;
  focused: boolean;
  addDisabled: boolean;
  searchTermSubject = new Subject<KeyboardEvent>();
  prevSearch: string;

  @ViewChild("searchInput") searchInput: ElementRef;

  constructor(
    private notifierService: NotifierService
  ) {
    this.searchTermSubject.
      pipe(
        debounceTime(500),
      ).subscribe(event => {
        if (event.key !== "Enter" && (this.task.name || this.prevSearch)) {
          this.searchTasks();
        }
      });
  }

  ngOnInit(): void {
    this.filtered = false;
    this.addDisabled = true;
    this.focused = false;
  }

  ngOnDestroy(): void {
    this.resetTask();
  }

  onKeyUp(event: KeyboardEvent): void {
    this.searchTermSubject.next(event);
  }

  toggleFocus(focused: boolean): void {
    this.focused = focused;
    if (focused) {
      setTimeout(()=>{
        this.searchInput.nativeElement.focus();
      },0); 
    }
  }

  resetTask(): void {
    this.task = {
      id: null,
      name: '',
      desc: '',
      dueDate: null,
      isCompleted: false,
      listId: ''
    };
    this.filtered = false;
    this.addDisabled = true;
    if (this.prevSearch) {
      this.prevSearch = '';
      this.notifierService.notify({name: this.task.name});
    }
  } 

  searchTasks(): void {
    this.prevSearch = this.task.name;
    if (this.task.name.length > 0) {
      this.addDisabled = false;
      this.notifierService.notify({
        name: this.task.name
      });
      this.filtered = true;
    } else {
      this.addDisabled = true;
      this.notifierService.notify({ name: '' });
      this.filtered = false;
    }
  }
}
