import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  task = {
    name: ''
  };

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  addTask(): void {
    const data = {
      name: this.task.name
    };

    this.taskService.create(data)
      .subscribe(
        response => {
          console.log(response);
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
  } 

}
