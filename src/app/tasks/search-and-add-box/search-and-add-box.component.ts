import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { NotifierService } from '../../services/notifier.service'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../task';

@Component({
  selector: 'app-search-and-add-box',
  templateUrl: './search-and-add-box.component.html',
  styleUrls: ['./search-and-add-box.component.scss']
})
export class SearchAndAddBoxComponent implements OnInit, OnDestroy {

  task: Task = {
    id: null,
    name: '',
    desc: '',
    dueDate: null,
    completed: false
  };
  filtered: boolean;
  focused: boolean;
  addDisabled: boolean;
  searchTermSubject = new Subject<KeyboardEvent>();
  prevSearch: string;

  @ViewChild("searchInput") searchInput: ElementRef;

  constructor(
    private taskService: TaskService,
    private notifierService: NotifierService,
    private snackBar: MatSnackBar
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
    this.focused = true;
    
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.searchInput.nativeElement.focus();
    },0);  
  }

  ngOnDestroy(): void {
    this.resetTask();
  }

  onSubmit(): void {
    this.addTask();
  }

  onKeyUp(event: KeyboardEvent): void {
    this.searchTermSubject.next(event);
  }

  toggleFocus(focused: boolean): void {
    this.focused = focused;
  }

  addTask(): void {
    const data = {
      name: this.task.name,
      dueDate: this.task.dueDate,
      desc: this.task.desc
    };

    this.taskService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.resetTask();
          /* Move to Add Task workflow */
          // this.NotifierService.genericNotify(this.NotifierService.taskAddedSubject, 
          //   <Task>{
          //     id: response._id,
          //     name: response.name,
          //     desc: response.desc,
          //     dueDate: response.dueDate,
          //     completed: response.completed
          //   }); 
          this.snackBar.open('Task added', null, { duration: 1500 });
        },
        error => {
          console.log(error);
        }
      );
  }

  resetTask(): void {
    this.task = {
      id: null,
      name: '',
      desc: '',
      dueDate: null,
      completed: false
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
        // name: this.exactPhraseOn ? '\"' + this.task.name + '\"' : this.task.name
        name: this.task.name
      });
      this.filtered = true;
    } else {
      this.addDisabled = true;
      this.notifierService.notify({ name: '' });
      this.filtered = false;
    }
  }
  
  // toggleExactPhrase() {
  //   this.exactPhraseOn = !this.exactPhraseOn;
  //   if (this.exactPhraseOn) {
  //     this.snackBar.open('Search exact phrase ON', null, { duration: 1500 });
  //   }
  //   else {
  //     this.snackBar.open('Search exact phrase OFF', null, { duration: 1500 });
  //   }
  //   this.searchTasks();
  // }

}
