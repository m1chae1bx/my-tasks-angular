import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { NotifierService } from '../../services/notifier.service'
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  task = {
    name: '',
    description: '',
    dueDate: ''
  };
  filtered: Boolean;
  addDisabled: Boolean;
  searchSubject = new Subject();
  exactPhraseOn: boolean;

  constructor(
    private taskService: TaskService,
    private NotifierService: NotifierService,
    private snackBar: MatSnackBar
  ) {
    this.searchSubject.
      pipe(
        debounceTime(300),
      ).subscribe(() => this.searchTasks());
  }

  ngOnInit(): void {
    this.filtered = false;
    this.addDisabled = true;
    this.exactPhraseOn = true;
  }

  addTask(): void {
    const data = {
      name: this.task.name,
      dueDate: this.task.dueDate,
      desc: this.task.description
    };

    this.taskService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.resetTask();
          this.snackBar.open('Task added', null, { duration: 1500 });
        },
        error => {
          console.log(error);
        }
      );
  }

  resetTask(): void {
    this.task = {
      name: '',
      description: '',
      dueDate: null
    };
    this.filtered = false;
    this.addDisabled = true;
    this.NotifierService.notify({name: this.task.name});
  } 

  searchTasks(): void {
    if (this.task.name.length > 0) {
      this.addDisabled = false;
      this.NotifierService.notify({
        name: this.exactPhraseOn ? '\"' + this.task.name + '\"' : this.task.name
      });
      this.filtered = true;
    } else {
      this.addDisabled = true;
      this.NotifierService.notify({ name: '' });
      this.filtered = false;
    }
  }
  
  toggleExactPhrase() {
    this.exactPhraseOn = !this.exactPhraseOn;
    if (this.exactPhraseOn) {
      this.snackBar.open('Search exact phrase ON', null, { duration: 1500 });
    }
    else {
      this.snackBar.open('Search exact phrase OFF', null, { duration: 1500 });
    }
    this.searchTasks();
  }

}
