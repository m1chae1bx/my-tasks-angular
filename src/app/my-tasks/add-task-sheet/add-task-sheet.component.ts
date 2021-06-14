import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../task';
import { TaskSetNameComponent } from '../task-item/task-set-name/task-set-name.component';

@Component({
  selector: 'app-add-task-sheet',
  templateUrl: './add-task-sheet.component.html',
  styleUrls: ['./add-task-sheet.component.scss']
})
export class AddTaskSheetComponent implements OnInit, AfterViewInit {

  isSaving: boolean;
  task: Task = {
    id: null,
    name: '',
    desc: '',
    dueDate: null,
    completed: false
  };
  newTaskFormGroup: FormGroup;
  nameFormControl = new FormControl('');
  descFormControl = new FormControl('');
  dueDateFormControl = new FormControl(null);

  @ViewChild('taskSetName') taskSetName: TaskSetNameComponent;
  @ViewChild('submitBtn') submitBtn: MatButton;

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private bottomSheetRef: MatBottomSheetRef<AddTaskSheetComponent>
  ) { }

  ngOnInit(): void {
    this.newTaskFormGroup = new FormGroup({
      'name': this.nameFormControl,
      'desc': this.descFormControl,
      'dueDate': this.dueDateFormControl
    });
  }

  ngAfterViewInit(): void {
    this.taskSetName.focus();
  }

  dismiss(): void {
    this.bottomSheetRef.dismiss();
  }

  submitForm(): void {
    (this.submitBtn._elementRef.nativeElement as HTMLButtonElement).click();
  }

  addTask(): void {
    const data = {
      name: this.nameFormControl.value,
      dueDate: this.dueDateFormControl.value,
      desc: this.descFormControl.value
    };

    this.isSaving = true;
    this.taskService.create(data)
      .subscribe(
        response => {
          console.log(response);
          // this.isSaving = false;
          this.dismiss();
          /* Move to Add Task workflow */
          // this.NotifierService.genericNotify(this.NotifierService.taskAddedSubject, 
          //   <Task>{
          //     id: response.id,
          //     name: response.name,
          //     desc: response.desc,
          //     dueDate: response.dueDate,
          //     completed: response.completed
          //   }); 
          this.snackBar.open('Task added', null, { duration: 1500 });
        },
        error => {
          this.isSaving = false;
          this.snackBar.open('An error occured while adding the task. Please try again later.', null, { duration: 4000 });
          console.log(error);
        }
      );
  }

  // this.isSaving = true;
  //   this.taskService.update(this.task.id, this.task)
  //     .subscribe(
  //       response => {
  //         this.dismiss();// @todo what if this is moved to output emitter
  //         this.notifierService.genericNotify(this.notifierService.taskUpdatedSubject, this.task);
  //         if (this.task.completed) {
  //           this.snackBar.open('Task completed', null, { duration: 1500 });
  //         } else {
  //           this.snackBar.open('Task updated', null, { duration: 1500 });
  //         }
  //         this.isSaving = false;
  //         console.log(response);
  //       },
  //       error => {
  //         this.isSaving = false;
  //         console.log(error);
  //       }
  //     );

}
