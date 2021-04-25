import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule}  from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRippleModule } from '@angular/material/core';

import { TasksComponent } from './tasks.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { TaskItemComponent, TaskDetailSheet } from './task-item/task-item.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskFiltersComponent, DueDateFilterSheet } from './task-filters/task-filters.component';
import { NavbarComponent } from '../core/navbar/navbar.component';
import { MainToolbarComponent } from '../core/main-toolbar/main-toolbar.component';
import { SearchAndAddBoxComponent } from './search-and-add-box/search-and-add-box.component';
import { TaskSetDueDateComponent } from './task-item/task-set-due-date/task-set-due-date.component';
import { TaskAssignListComponent } from './task-item/task-assign-list/task-assign-list.component';
import { TaskSetReminderComponent } from './task-item/task-set-reminder/task-set-reminder.component';
import { TaskMakeRecurringComponent } from './task-item/task-make-recurring/task-make-recurring.component';
import { TaskSetNameComponent } from './task-item/task-set-name/task-set-name.component';
import { TaskSetDescComponent } from './task-item/task-set-desc/task-set-desc.component';
import { SubToolbarComponent } from '../core/sub-toolbar/sub-toolbar.component';
@NgModule({
  declarations: [
    TasksComponent,
    AddTaskComponent,
    TaskItemComponent,
    TaskDetailSheet,
    TaskListComponent,
    TaskDetailComponent,
    TaskFiltersComponent,
    DueDateFilterSheet,
    NavbarComponent,
    SearchAndAddBoxComponent,
    TaskSetDueDateComponent,
    TaskAssignListComponent,
    TaskSetReminderComponent,
    TaskMakeRecurringComponent,
    TaskSetNameComponent,
    TaskSetDescComponent,
    MainToolbarComponent,
    SubToolbarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatRippleModule
  ],
  exports: [
    TasksComponent
  ]
})
export class TasksModule { }
