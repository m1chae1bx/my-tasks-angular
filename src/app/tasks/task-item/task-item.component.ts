import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Task } from '../task'
import { TaskService } from '../../services/task.service';
import { RepollNotifierService } from '../../services/repoll-notifier.service'

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  dueDateStr: string = null;
  dueDate: Date;
  itemSelected: boolean;
  originalTask: any;
  overdue: boolean;

  @Input() task: Task;
  @Input() today: Date;
  @Input() tomorrow: Date;
  @ViewChild('taskName') taskName: ElementRef;

  constructor(
    private taskService: TaskService,
    private repollNotifierService: RepollNotifierService
  ) { }

  ngOnInit(): void {
    this.updateDisplayDate();
    this.itemSelected = false;
  }

  editTaskToggle(): void {
    this.itemSelected = !this.itemSelected;

    if (this.itemSelected) {
      this.originalTask = {... this.task};
    } else {
      this.task = this.originalTask;
    }

    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.taskName.nativeElement.focus();
    },0);  
  }

  update(): void {
    this.taskService.update(this.task.id, this.task)
      .subscribe(
        response => {
          setTimeout(()=>{ this.repollNotifierService.notify(null) }, 500); // @todo: change to emit, updating of list should be done in task-list component
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }

  toggleCompleted(): void {
    this.update();
  }

  save(): void {
    this.update();
  }

  remove(): void {
    this.taskService.delete(this.task.id)
      .subscribe(
        response => {
          console.log(response);
          this.repollNotifierService.notify(null);
        },
        error => {
          console.log(error);
        }
      );
  }

  onDateChange(): void {
    this.updateDisplayDate();
  }

  updateDisplayDate(): void {
    if (this.today.toISOString() === this.task.dueDate?.toISOString()) {
      this.dueDateStr = 'Today'
    } else if (this.tomorrow.toISOString() === this.task.dueDate?.toISOString()) {
      this.dueDateStr = 'Tomorrow'
    } else {
      this.dueDateStr = null;
    }
    if (this.task.dueDate?.getTime() < this.today.getTime()) {
      this.overdue = true;  
    } else {
      this.overdue = false;
    }
  }
}
