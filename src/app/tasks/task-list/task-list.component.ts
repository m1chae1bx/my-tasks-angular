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
  processCount = Language.processCount;

  constructor(
    private taskService: TaskService,
    private repollNotifierService: RepollNotifierService,
  ) { }

  ngOnInit(): void {
    this.filters = {
      dueDate: 'default',
      dueDateDisplay: 'Any Date',
      showCompleted: false
    }
    this.nameSearch = null;    
    this.repollSubscription = this.repollNotifierService.obs.subscribe(data => {
      console.log('repoll', data);
      if (data?.name || data?.name === '') {
        this.nameSearch = data.name; 
      }
      if (data?.filters) {
        this.filters = data.filters;
      }
      
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
          this.taskCount = Object.keys(this.tasks).length;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }

}
