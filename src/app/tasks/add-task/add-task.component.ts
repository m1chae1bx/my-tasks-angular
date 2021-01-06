import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { RepollNotifierService } from '../../services/repoll-notifier.service'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  task = {
    name: ''
  };
  filtered: Boolean;

  constructor(
    private taskService: TaskService,
    private repollNotifierService: RepollNotifierService
  ) { }

  ngOnInit(): void {
    this.filtered = false;
  }

  addTask(): void {
    const data = {
      name: this.task.name
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
      name: ''
    };
    this.filtered = false;
  } 

  searchTasks(): void {
    if (this.task.name.length > 1) { // @todo show tooltip on limit on searches
      this.repollNotifierService.notify({name: this.task.name});
      this.filtered = true;
    } else if (this.filtered) {
      this.repollNotifierService.notify(null);
      this.filtered = false;
    }
  }

}
