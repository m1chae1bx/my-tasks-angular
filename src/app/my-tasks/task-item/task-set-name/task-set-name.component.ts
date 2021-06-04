import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-task-set-name',
  templateUrl: './task-set-name.component.html',
  styleUrls: ['./task-set-name.component.scss']
})
export class TaskSetNameComponent implements OnInit, AfterViewInit {

  originalName: string;
  focused: boolean;

  @Input() placeholder: string;
  @Input() nameFormControl: FormControl;
  @Input() completed: boolean;
  @Output() submitForm = new EventEmitter();
  @ViewChild('taskName') taskName: ElementRef;

  constructor(private notifier: NotifierService) {}

  ngOnInit(): void {
    this.originalName = this.nameFormControl.value;
    this.focused = true;
  }

  ngAfterViewInit(): void {
    this.taskName.nativeElement.value = this.nameFormControl.value;
    this.adjustHeight();
  }

  onChange() {
    this.notifier.genericNotify(
      this.notifier.taskEditNameSubject, 
      this.nameFormControl.value != this.originalName
    );
    this.adjustHeight();
  }

  onBlur() {
    if (!this.nameFormControl.value) this.nameFormControl.setValue(this.originalName);
    this.focused = false;
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.submitForm.emit(null);
    }
  }

  focus() {
    setTimeout(()=>{
      this.taskName.nativeElement.focus();
    },0); 
  }

  adjustHeight(): void {
    this.taskName.nativeElement.style.height = 'auto';
    if (this.taskName.nativeElement.scrollHeight < 72) { // 4 rows
      this.taskName.nativeElement.style.height = this.taskName.nativeElement.scrollHeight+'px';
    } else {
      this.taskName.nativeElement.style.height = '88px';
    }
  }
}
