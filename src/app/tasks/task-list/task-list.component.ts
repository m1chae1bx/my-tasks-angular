import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Language } from 'src/app/utilities/language';
import { RepollNotifierService } from '../../services/repoll-notifier.service'
import { TaskService } from '../../services/task.service';
import { Filters } from '../filters';
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
  filters: Filters;
  currentDate: Date;
  tomorrowDate: Date;
  todayStr: String;
  tomorrowStr: String;
  processCount = Language.processCount;

  constructor(
    private taskService: TaskService,
    private repollNotifierService: RepollNotifierService,
  ) { }

  ngOnInit(): void {
    this.filters = {
      dueDate: 'default',
      showCompleted: false
    }
    this.nameSearch = null;

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

  getTasks() {
    this.taskService.find(
      this.nameSearch, 
      this.filters.showCompleted ? null : false,
      this.filters.dueDate === 'default' ? null : this.filters.dueDate
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

}
