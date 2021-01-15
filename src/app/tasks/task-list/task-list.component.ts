import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatChipSelectionChange } from '@angular/material/chips';
import { Subscription } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Language } from 'src/app/utilities/language';
import { RepollNotifierService } from '../../services/repoll-notifier.service'
import { TaskService } from '../../services/task.service';
import { Task } from '../task';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnDestroy {

  tasks: Task[];
  taskCount: Number;
  private repollSubscription: Subscription;
  nameSearch: String;
  showCompleted: Boolean;
  dueDateFilter: any;
  currentDate: Date;
  tomorrowDate: Date;
  todayStr: String;
  tomorrowStr: String;
  filterPanelShadows: Boolean;
  processCount = Language.processCount;

  constructor(
    private taskService: TaskService,
    private repollNotifierService: RepollNotifierService,
  ) { }

  ngOnInit(): void {
    this.showCompleted = false;
    this.nameSearch = null;
    this.dueDateFilter = "default";
    this.filterPanelShadows = false;
    this.currentDate = new Date();
    this.currentDate.setHours(0,0,0,0);
    this.todayStr = this.currentDate.toISOString();
    this.tomorrowDate = new Date();
    this.tomorrowDate.setUTCHours(0,0,0,0);
    this.tomorrowDate.setMinutes(this.tomorrowDate.getMinutes() + this.tomorrowDate.getTimezoneOffset())
    this.tomorrowDate.setDate(this.tomorrowDate.getDate() + 1);
    
    this.tomorrowStr = this.tomorrowDate.toISOString();
    console.log(this.tomorrowStr);
    this.getTasks();
    this.repollSubscription = this.repollNotifierService.obs.subscribe(data => {
      this.nameSearch = data?.name;
      this.getTasks();
    });
  }

  ngOnDestroy() {
    this.repollSubscription.unsubscribe();
  }

  toggleCompleted() {
    this.showCompleted = !this.showCompleted;
    this.getTasks();
  }

  getTasks() {
    this.taskService.find(
      this.nameSearch, 
      this.showCompleted ? null : false,
      this.dueDateFilter === 'default' ? null : this.dueDateFilter
    )
      .subscribe(
        data => {
          this.tasks = data.map((x: { id: any; name: any; desc: any; dueDate: any; completed: any; }) => {
            return <Task>
            {
              id: x.id,
              name: x.name,
              desc: x.desc,
              dueDate: x.dueDate ? new Date(x.dueDate) : null,
              completed: x.completed
            }
          });
          this.taskCount = Object.keys(this.tasks).length;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  changeDueDateFilter(code: any): void {
    if (this.dueDateFilter != code) {
      this.dueDateFilter = code;
      this.getTasks();
    }
  }

}
