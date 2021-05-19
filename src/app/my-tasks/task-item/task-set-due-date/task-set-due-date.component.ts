import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
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
  weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  @Input() dueDateFormControl: FormControl;
  @Input() completed: boolean;
  @ViewChild('menuTrigger', {read: MatMenuTrigger}) menuTrigger: MatMenuTrigger;
  @ViewChild('picker') picker: MatDatepicker<any>;

  constructor(private notifier: NotifierService) {}

  ngOnInit(): void {
    this.updateDisplayDate();
    this.originalDate = this.dueDateFormControl.value;
  }

  updateDisplayDate(): void {
    this.isCurrentYear = DateUtil.isCurrentYear(this.dueDateFormControl.value);
    this.isToday = DateUtil.isToday(this.dueDateFormControl.value);
    this.isTomorrow = DateUtil.isTomorrow(this.dueDateFormControl.value);
    this.isOverdue = this.dueDateFormControl.value?.getTime() < DateUtil.today.getTime();
  }

  onChangeDate(): void {
    this.notifier.genericNotify(
      this.notifier.taskEditDueDateSubject, 
      this.dueDateFormControl.value?.toString() != this.originalDate?.toString()
    );
    this.updateDisplayDate();  
  }

  openMenu(event: Event) {
    event.preventDefault();
    this.menuTrigger.openMenu();
  }

  setDueDate(i: number): void { // convert to smaller data type
    switch(i) {
      case 0:
        this.dueDateFormControl.setValue(DateUtil.today);
        break;
      case 1:
        this.dueDateFormControl.setValue(DateUtil.tomorrow);
        break;
      case 2:
        this.dueDateFormControl.setValue(DateUtil.overmorrow);
        break;
      case 7:
        this.dueDateFormControl.setValue(DateUtil.nextWeek);
        break;
      case 9:
        this.picker.open();
        break;
    }
    this.onChangeDate();
  }

  clearDueDate(): void {
    this.dueDateFormControl.setValue(null);
    this.onChangeDate();
  }

  getDay(filter: number): string {
    switch(filter) {
      case 0:
        return this.weekday[DateUtil.today.getDay()];
        break;
      case 1:
        return this.weekday[DateUtil.tomorrow.getDay()];
        break;
      // case 2:
      //   return this.weekday[DateUtil.overmorrow.getDay()];
      //   break;
      // case 7:
      //   return this.weekday[DateUtil.nextWeek.getDay()];
      //   break;
    }
  }

  getDate(filter: number): Date {
    switch(filter) {
      // case 0:
      //   return DateUtil.today.;
      //   break;
      // case 1:
      //   return DateUtil.tomorrow;
      //   break;
      case 2:
        return DateUtil.overmorrow;
        break;
      case 7:
        return DateUtil.nextWeek;
        break;
    }
  }

}
