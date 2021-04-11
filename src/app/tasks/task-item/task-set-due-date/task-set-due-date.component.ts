import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { NotifierService } from 'src/app/services/notifier.service';
import { DateUtil } from 'src/app/utilities/date-util';
import { Task } from '../../task';

@Component({
  selector: 'app-task-set-due-date',
  templateUrl: './task-set-due-date.component.html',
  styleUrls: ['./task-set-due-date.component.scss']
})
export class TaskSetDueDateComponent implements OnInit {

  isOverdue: boolean;
  isToday: boolean;
  isTomorrow: boolean;
  isCurrentYear: boolean;
  originalDate: Date;

  @Input() task: Task;
  @ViewChild('menuTrigger', {read: MatMenuTrigger}) menuTrigger: MatMenuTrigger;

  constructor(private notifier: NotifierService) {}

  ngOnInit(): void {
    this.updateDisplayDate();
    this.originalDate = this.task.dueDate;
  }

  updateDisplayDate(): void {
    this.isCurrentYear = DateUtil.isCurrentYear(this.task.dueDate);
    this.isToday = DateUtil.isToday(this.task.dueDate);
    this.isTomorrow = DateUtil.isTomorrow(this.task.dueDate);
    this.isOverdue = this.task.dueDate?.getTime() < DateUtil.today.getTime();
  }

  onChangeDate(): void {
    this.notifier.genericNotify(
      this.notifier.taskEditDueDateSubject, 
      this.task.dueDate?.toString() != this.originalDate?.toString()
    );
    this.updateDisplayDate();  
  }

  openMenu(event: Event) {
    event.preventDefault();
    this.menuTrigger.openMenu();
  }

  setDueDate(i: number): void {
    switch(i) {
      case 1: {
        this.task.dueDate = DateUtil.today;
        break;
      }
      case 2: {
        this.task.dueDate = DateUtil.tomorrow;
        break;
      }
      case 3: {
        this.task.dueDate = DateUtil.overmorrow;
        break;
      }
      case 4: {
        this.task.dueDate = DateUtil.nextWeek;
        break;
      }
    }
    this.onChangeDate();
  }

  clearDueDate(): void {
    this.task.dueDate = null;
    this.onChangeDate();
  }
}
