import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TasksComponent } from './tasks.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  declarations: [
    TasksComponent,
    AddTaskComponent,
    TaskItemComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TasksComponent
  ]
})
export class TasksModule { }
