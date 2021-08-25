import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FiltersService } from 'src/app/services/filters.service';
import { Language } from 'src/app/utilities/language';
import { NotifierService } from '../../services/notifier.service'
import { TaskService } from '../../services/task.service';
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
  processCount = Language.processCount;

  constructor(
    private taskService: TaskService,
    private notifierService: NotifierService,
    public filtersService: FiltersService
  ) { }

  ngOnInit(): void {
    this.nameSearch = null;    
    this.repollSubscription = this.notifierService.taskListObs.subscribe(data => {
      if (data?.name || data?.name === '') {
        this.nameSearch = data.name; 
      }
      this.tasks = null;
      this.getTasks();
    });
    this.getTasks();
  }

  ngOnDestroy() {
    this.repollSubscription.unsubscribe();
  }

  getTasks() {
    this.taskService.find(
      null,
      this.nameSearch, 
      this.filtersService.filters.showCompleted ? null : false,
      this.filtersService.filters.dueDate.code === 'default' ? null : this.filtersService.filters.dueDate.code
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
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  onTaskComplete(index: number): void {
    if (!this.filtersService.filters.showCompleted && index > -1) {
      this.tasks.splice(index, 1);
    }
  }

  onTaskUpdate(event: any): void {
    let tasks: Task[];
    this.taskService.find(
      event.id,
      this.nameSearch, 
      this.filtersService.filters.showCompleted ? null : false,
      this.filtersService.filters.dueDate.code === 'default' ? null : this.filtersService.filters.dueDate.code
    )
      .subscribe(
        data => {
          tasks = data.map((x: { id: any; name: any; desc: any; dueDate: any; completed: any; }) => {
            return <Task>
            {
              id: x.id,
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
