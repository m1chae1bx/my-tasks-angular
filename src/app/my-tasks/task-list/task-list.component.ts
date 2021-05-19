import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Language } from 'src/app/utilities/language';
import { NotifierService } from '../../services/notifier.service'
import { TaskService } from '../../services/task.service';
import { Filters } from '../filters';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  animations: [
    trigger('slideOut', [
      transition('completed => void', [
        animate('600ms ease-in', style({ transform: 'translateX(100%)' })), // @todo try not slide, distracting when snack bar also appears, slide up?
      ]),
    ]),
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('200ms')
      ]),
    ])
  ]
})
export class TaskListComponent implements OnInit, OnDestroy {

  tasks: Task[];
  private repollSubscription: Subscription;
  nameSearch: String;
  filters: Filters;
  processCount = Language.processCount;

  constructor(
    private taskService: TaskService,
    private NotifierService: NotifierService,
  ) { }

  ngOnInit(): void {
    this.filters = {
      dueDate: 'default',
      dueDateDisplay: 'Any Date',
      showCompleted: false
    }
    this.nameSearch = null;    
    this.repollSubscription = this.NotifierService.taskListObs.subscribe(data => {
      console.log('repoll', data);
      if (data?.name || data?.name === '') {
        this.nameSearch = data.name; 
      }
      if (data?.filters) {
        this.filters = data.filters;
      }
      
      this.tasks = null;
      this.getTasks();
    });
  }

  ngOnDestroy() {
    this.repollSubscription.unsubscribe();
  }

  getTasks() {
    this.taskService.find(
      null,
      this.nameSearch, 
      this.filters.showCompleted ? null : false,
      this.filters.dueDate === 'default' ? null : this.filters.dueDate
    )
      .subscribe(
        data => {
          this.tasks = data.map((x: { _id: any; name: any; desc: any; dueDate: any; completed: any; }) => {
            return <Task>
            {
              id: x._id,
              name: x.name,
              desc: x.desc,
              dueDate: x.dueDate ? new Date(x.dueDate) : null,
              completed: x.completed
            }
          });
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  onTaskComplete(index: number): void {
    if (!this.filters.showCompleted && index > -1) {
      this.tasks.splice(index, 1);
    }
  }

  onTaskUpdate(event: any): void {
    let tasks: Task[];
    this.taskService.find(
      event.id,
      this.nameSearch, 
      this.filters.showCompleted ? null : false,
      this.filters.dueDate === 'default' ? null : this.filters.dueDate
    )
      .subscribe(
        data => {
          tasks = data.map((x: { _id: any; name: any; desc: any; dueDate: any; completed: any; }) => {
            return <Task>
            {
              id: x._id,
              name: x.name,
              desc: x.desc,
              dueDate: x.dueDate ? new Date(x.dueDate) : null,
              completed: x.completed
            }
          });
          if (tasks.length === 0) {
            this.tasks.splice(event.index, 1);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

}
