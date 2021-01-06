import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../task'
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  @Input() task: any;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  removeTask(): void {
    this.taskService.delete(this.task.id)
      .subscribe(
        response => {
          console.log(response);
          // figure out how to update list
        },
        error => {
          console.log(error);
        }
      );
  }

}
