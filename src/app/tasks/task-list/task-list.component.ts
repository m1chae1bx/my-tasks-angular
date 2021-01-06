import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RepollNotifierService } from '../../services/repoll-notifier.service'
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {

  tasks : any;
  private repollSubscription: Subscription;

  constructor(
    private taskService: TaskService,
    private repollNotifierService: RepollNotifierService
  ) { }

  ngOnInit(): void {
    this.getTasks();
    this.repollSubscription = this.repollNotifierService.obs.subscribe(() => this.getTasks())
  }

  ngOnDestroy() {
    this.repollSubscription.unsubscribe();
}

  getTasks() {
    this.taskService.getAll()
    .subscribe(
      data => {
        this.tasks = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

}
