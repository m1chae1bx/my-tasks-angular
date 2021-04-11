import { AfterViewChecked, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../../services/task.service';
import { NotifierService, RepollData } from '../../services/notifier.service';
import { DateUtil } from '../../utilities/date-util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { combineLatest, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit, AfterViewChecked {

  dueDate: Date;
  isOverdue: boolean;
  isCurrentYear: boolean;
  isToday: boolean;
  isTomorrow: boolean;
  isNameOverflow: boolean;
  isUpdated: boolean;

  @Input() task: Task;
  @Input() index: number;
  @ViewChild('taskName') taskName: ElementRef;
  @ViewChild('taskItemDiv') taskItemDiv: ElementRef;
  @ViewChild('taskNameValue') taskNameValue: ElementRef;
  @ViewChild('taskNameFade') taskNameFade: ElementRef;
  @ViewChild('taskDescValue') taskDescValue: ElementRef;
  @ViewChild('taskDescFade') taskDescFade: ElementRef;
  @Output() completed = new EventEmitter<number>();
  @Output() updated = new EventEmitter<any>();

  constructor(
    private taskService: TaskService,
    private notifierService: NotifierService,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet
  ) { }

  ngAfterViewChecked(): void {
    if (parseInt(getComputedStyle(this.taskNameValue.nativeElement).height) > 60) {
      this.taskNameFade.nativeElement.style.display = "block";
    } else {
      this.taskNameFade.nativeElement.style.display = "none";
    }

    if (this.taskDescValue) {
      if (parseInt(getComputedStyle(this.taskDescValue.nativeElement).height) > 48) {
        this.taskDescFade.nativeElement.style.display = "block";
      } else {
        this.taskDescFade.nativeElement.style.display = "none";
      }
    }
  }
  

  ngOnInit(): void {
    this.updateDisplayDate();
    this.isNameOverflow = false;
    this.isUpdated = false;
  }

  updateDisplayDate(): void {
    this.isCurrentYear = DateUtil.isCurrentYear(this.task.dueDate);
    this.isToday = DateUtil.isToday(this.task.dueDate);
    this.isTomorrow = DateUtil.isTomorrow(this.task.dueDate);
    this.isOverdue = DateUtil.isOverdue(this.task.dueDate);
  }

  openTaskDetailSheet(): void {
    const bottomSheetRef = this.bottomSheet.open(TaskDetailSheet, { data: {... this.task}});
    const updateWatcher = this.notifierService.taskUpdated.pipe(take(1)).subscribe(data => {
      this.updated.emit({id: data.id, index: this.index});
      this.task = data;
      this.isUpdated = true;
      this.updateDisplayDate();
    })
    bottomSheetRef.afterDismissed().pipe(take(1)).subscribe(() => {
      updateWatcher.unsubscribe();
    })
  }

  toggleCompleted(): void {
    this.update();
  }

  update(): void {
    this.taskService.update(this.task.id, this.task)
      .subscribe(
        response => {
          
          if (this.task.completed) {
            this.snackBar.open('Task completed', null, { duration: 2500 });
            this.completed.emit(this.index);
          } else { // If task was changed from completed to not completed, only possible if show completed is on
            this.snackBar.open('Task updated', null, { duration: 1500 });
          }
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }
}

@Component({
  selector: 'task-detail-sheet',
  templateUrl: 'task-detail-sheet.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskDetailSheet implements OnInit, OnDestroy {

  isSaving: boolean;
  isEdited: boolean;
  isDeleting: boolean;
  taskEditSubs: Subscription;
  uneditedTask: Task;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public task: Task,
    private taskService: TaskService,
    private notifierService: NotifierService,
    private snackBar: MatSnackBar,
    private bottomSheetRef: MatBottomSheetRef<TaskDetailSheet>
  ) {}

  ngOnInit(): void {
    this.uneditedTask = {... this.task};
    this.notifierService.taskEditNameSubject.next(false);
    this.notifierService.taskEditDescSubject.next(false);
    this.notifierService.taskEditDueDateSubject.next(false);
    this.notifierService.taskIsDoneSubject.next(false);

    this.taskEditSubs = combineLatest([
      this.notifierService.taskNameChanged,
      this.notifierService.taskDescChanged,
      this.notifierService.taskDueDateChanged,
      this.notifierService.taskIsDoneChanged
    ])
    .subscribe(([nameChanged, descChanged, dueDateChanged, isDoneChanged]) => {
      this.isEdited = nameChanged || descChanged || dueDateChanged || isDoneChanged;
    });
  }

  ngOnDestroy(): void {
    this.taskEditSubs.unsubscribe();
  }

  toggleCompleted(): void {
    this.notifierService.genericNotify(this.notifierService.taskIsDoneSubject, this.task.completed != this.uneditedTask.completed);
  }

  save(): void {
    this.update();
  }

  remove(): void {
    this.isDeleting = true;
    this.taskService.delete(this.task.id)
      .subscribe(
        response => {
          this.isDeleting = false;
          console.log(response);
          this.dismiss();
          this.notifierService.notify(<RepollData>{});
          this.snackBar.open('Task deleted', null, { duration: 1500 });
        },
        error => {
          this.isDeleting = false;
          this.snackBar.open('A problem occured while deleting the task. Please try again later.', null, { duration: 1500 });
          console.log(error);
        }
      );
  }

  dismiss(): void {
    this.bottomSheetRef.dismiss();
  }

  update(): void {
    this.isSaving = true;
    this.taskService.update(this.task.id, this.task)
      .subscribe(
        response => {
          this.dismiss();// @todo what if this is moved to output emitter
          this.notifierService.genericNotify(this.notifierService.taskUpdatedSubject, this.task);
          if (this.task.completed) {
            this.snackBar.open('Task completed', null, { duration: 1500 });
          } else {
            this.snackBar.open('Task updated', null, { duration: 1500 });
          }
          this.isSaving = false;
          console.log(response);
        },
        error => {
          this.isSaving = false;
          console.log(error);
        }
      );
  }
}
