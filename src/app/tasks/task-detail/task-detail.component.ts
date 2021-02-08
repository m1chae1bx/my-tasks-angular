import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RepollNotifierService } from 'src/app/services/repoll-notifier.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../task';
import { DateUtil } from '../../utilities/date-util';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  dueDate: Date;

  @Input() task: Task;
  @Input() appearance: MatFormFieldAppearance;
  @Input() hideDescription: boolean = false;
  @Output() dateChanged = new EventEmitter<string>();

  constructor(
    private taskService: TaskService,
    private repollNotifierService: RepollNotifierService
  ) { }

  ngOnInit(): void {
    this.dueDate = this.task.dueDate; // || new Date();
  }

  onChangeUpdate(): void {
    this.dateChanged.emit(null);
  }

  clearDueDate(): void {
    console.log('hello world!');
    this.task.dueDate = null;
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
  }
  
}
