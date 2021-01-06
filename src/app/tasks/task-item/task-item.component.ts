import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../task'
import { TaskService } from '../../services/task.service';
import { RepollNotifierService } from '../../services/repoll-notifier.service'

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() task: any;

  constructor(
    private taskService: TaskService,
    private repollNotifierService: RepollNotifierService
  ) { }

  ngOnInit(): void {
  }

  removeTask(): void {
    this.taskService.delete(this.task.id)
      .subscribe(
        response => {
          console.log(response);
          this.repollNotifierService.notify(null);
        },
        error => {
          console.log(error);
        }
      );
  }

  toggleCompleted(): void {
    console.log(this.task.completed);
    this.taskService.update(this.task.id, this.task)
      .subscribe(
        response => {
          console.log(response);
          // @todo: Add delay and fade before refreshing list
          this.repollNotifierService.notify(null);
        },
        error => {
          console.log(error);
        }
      );
  }

}
