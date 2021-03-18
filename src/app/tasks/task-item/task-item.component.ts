import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../../services/task.service';
import { NotifierService, RepollData } from '../../services/notifier.service';
import { DateUtil } from '../../utilities/date-util';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  saving: boolean;

  @Input() task: Task;
  @ViewChild('taskName') taskName: ElementRef;
  @ViewChild('taskItemDiv') taskItemDiv: ElementRef;

  constructor(
    private taskService: TaskService,
    private NotifierService: NotifierService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.updateDisplayDate();
    this.itemSelected = false;
  }

  editTaskToggle(): void {
    this.itemSelected = !this.itemSelected;

    if (this.itemSelected) {
      this.originalTask = {... this.task};
      setTimeout(()=>{ // this will make the execution after the above boolean has changed
        this.taskName.nativeElement.focus();
        this.taskItemDiv.nativeElement.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      },0);  
    } else {
      this.task = this.originalTask;
    }
  }

  update(): void {
    this.saving = true;
    this.taskService.update(this.task.id, this.task)
      .subscribe(
        response => {
          setTimeout(()=>{ 
            this.NotifierService.notify(<RepollData>{});
            if (this.task.completed) {
              this.snackBar.open('Task completed', null, { duration: 1500 });
            } else {
              this.snackBar.open('Task updated', null, { duration: 1500 });
            }
            this.saving = false;
          }, 500); // @todo: change to emit, updating of list should be done in task-list component
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
          this.NotifierService.notify(<RepollData>{});
          this.snackBar.open('Task deleted', null, { duration: 1500 });
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
    if (DateUtil.today.toISOString() === this.task.dueDate?.toISOString()) {
      this.dueDateStr = 'Today'
    } else if (DateUtil.tomorrow.toISOString() === this.task.dueDate?.toISOString()) {
      this.dueDateStr = 'Tomorrow'
    } else {
      this.dueDateStr = null;
    }
    if (this.task.dueDate?.getTime() < DateUtil.today.getTime()) {
      this.overdue = true;  
    } else {
      this.overdue = false;
    }
  }
}
