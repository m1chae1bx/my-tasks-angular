import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RepollNotifierService } from 'src/app/services/repoll-notifier.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  dueDate: Date;

  @Input() task: Task;
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
  
}
