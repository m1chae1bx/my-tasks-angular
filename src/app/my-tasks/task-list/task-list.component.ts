import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FiltersService } from 'src/app/services/filters.service';
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
      console.log("hala");
      this.getTasks(this.filtersService.filters);
    });
    this.filtersService.filters$.subscribe(filters => filters ? this.getTasks(filters) : null);
  }

  ngOnDestroy() {
    this.repollSubscription.unsubscribe();
  }

  getTasks(filters: Filters) {
    this.taskService.find(
      null,
      this.nameSearch, 
      filters.showCompleted ? true : false,
      filters.dueDate.code === 'default' ? null : filters.dueDate.code,
      filters.list.id
    )
      .subscribe(
        data => {
          this.tasks = data.map((x: { id: string; name: any; desc: any; dueDate: any; isCompleted: any; listId: string}) => {
            return <Task>
            {
              id: x.id,
              name: x.name,
              desc: x.desc,
              dueDate: x.dueDate ? new Date(x.dueDate) : null,
              isCompleted: x.isCompleted,
              listId: x.listId
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
    console.log("onTaskUpdate");
    this.taskService.find(
      event.id,
      this.nameSearch, 
      this.filtersService.filters.showCompleted ? null : false,
      this.filtersService.filters.dueDate.code === 'default' ? null : this.filtersService.filters.dueDate.code,
      this.filtersService.filters.list.id
    )
      .subscribe(
        data => {
          tasks = data.map((x: { id: any; name: any; desc: any; dueDate: any; isCompleted: any; listId: string}) => {
            return <Task>
            {
              id: x.id,
              name: x.name,
              desc: x.desc,
              dueDate: x.dueDate ? new Date(x.dueDate) : null,
              isCompleted: x.isCompleted,
              listId: x.listId
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
