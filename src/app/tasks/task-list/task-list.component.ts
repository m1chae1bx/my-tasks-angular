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
  taskCount: Number;
  private repollSubscription: Subscription;
  nameSearch: String;
  showCompleted: Boolean;
  dueDateFilter: any;

  constructor(
    private taskService: TaskService,
    private repollNotifierService: RepollNotifierService
  ) { }

  ngOnInit(): void {
    this.showCompleted = false;
    this.nameSearch = null;
    this.dueDateFilter = "default";
    this.getTasks();
    this.repollSubscription = this.repollNotifierService.obs.subscribe(data => {
      this.nameSearch = data?.name;
      this.getTasks();
    });
  }

  ngOnDestroy() {
    this.repollSubscription.unsubscribe();
}

  getTasks() {
    this.taskService.find(
      this.nameSearch, 
      this.showCompleted ? null : false,
      this.dueDateFilter === 'default' ? null : this.dueDateFilter
    )
      .subscribe(
        data => {
          this.tasks = data;
          this.taskCount = Object.keys(this.tasks).length;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  onDueDateFilterChange(code: any): void {
    this.dueDateFilter = code;
    this.getTasks();
  }

}
