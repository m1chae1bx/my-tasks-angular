import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, Subscription } from 'rxjs';
import { NotifierService, RepollData } from 'src/app/services/notifier.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../task';

@Component({
  selector: 'app-edit-task-sheet',
  templateUrl: './edit-task-sheet.component.html',
  styleUrls: ['./edit-task-sheet.component.scss']
})
export class EditTaskSheetComponent implements OnInit, OnDestroy {

  isSaving: boolean;
  isEdited: boolean;
  isDeleting: boolean;
  taskEditSubs: Subscription;
  uneditedTask: Task;
  editTaskForm: FormGroup;
  nameFormControl = new FormControl(this.task.name);
  descFormControl = new FormControl(this.task.desc);
  dueDateFormControl = new FormControl(this.task.dueDate);
  completedFormControl = new FormControl(this.task.isCompleted);

  @ViewChild('submitBtn') submitBtn: MatButton;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public task: Task,
    private taskService: TaskService,
    private notifierService: NotifierService,
    private snackBar: MatSnackBar,
    private bottomSheetRef: MatBottomSheetRef<EditTaskSheetComponent>
  ) {}

  ngOnInit(): void {
    this.editTaskForm = new FormGroup({
      'name': this.nameFormControl,
      'desc': this.descFormControl,
      'dueDate': this.dueDateFormControl,
      'isCompleted': this.completedFormControl
    });
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
    this.notifierService.genericNotify(this.notifierService.taskIsDoneSubject, this.completedFormControl.value != this.uneditedTask.isCompleted);
  }

  remove(): void {
    this.isDeleting = true;
    this.taskService.delete(this.task.id, this.task.listId)
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
          this.snackBar.open('An error occured while deleting the task. Please try again later.', null, { duration: 4000 });
          console.log(error);
        }
      );
  }

  dismiss(): void {
    this.bottomSheetRef.dismiss();
  }

  submitForm(): void {
    console.log('test');
    (this.submitBtn._elementRef.nativeElement as HTMLButtonElement).click();
  }

  save(): void {
    this.isSaving = true;
    this.task.name = this.nameFormControl.value;
    this.task.desc = this.descFormControl.value;
    this.task.dueDate = this.dueDateFormControl.value;
    this.task.isCompleted = this.completedFormControl.value;

    this.taskService.update(this.task.id, this.task)
      .subscribe(
        response => {
          this.dismiss();// @todo what if this is moved to output emitter
          if (this.task.isCompleted) {
            this.notifierService.genericNotify(this.notifierService.taskUpdatedSubject, this.task);
            this.snackBar.open('Task completed', null, { duration: 1500 });
          } else {
            this.notifierService.notify(<RepollData>{});
            this.snackBar.open('Task updated', null, { duration: 1500 });
          }
          console.log(response);
        },
        error => {
          this.isSaving = false;
          this.snackBar.open('An error occured while updating the task. Please try again later.', null, { duration: 4000 });
          console.log(error);
        }
      );
  }
}
