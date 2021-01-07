import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  dueDate: Date;

  @Input() task: any;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.dueDate = this.task.dueDate; // || new Date();
  }

  setDueDate(): void {
    this.task.dueDate = this.dueDate;
    this.taskService.update(this.task.id, this.task)
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

}
