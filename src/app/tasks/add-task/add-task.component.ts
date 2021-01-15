import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { RepollNotifierService } from '../../services/repoll-notifier.service'
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

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

  constructor(
    private taskService: TaskService,
    private repollNotifierService: RepollNotifierService
  ) { }

  ngOnInit(): void {
    this.filtered = false;
    this.addDisabled = true;
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
          this.repollNotifierService.notify(null);
          this.resetTask();
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
  } 

  searchTasks(): void {
    if (this.task.name.length > 0) {
      this.addDisabled = false;
      this.repollNotifierService.notify({name: this.task.name});
      this.filtered = true;
    } else {
      this.addDisabled = true;
      this.repollNotifierService.notify(null);
      this.filtered = false;
    }
  }
  

}
