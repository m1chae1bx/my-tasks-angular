import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-task-set-desc',
  templateUrl: './task-set-desc.component.html',
  styleUrls: ['./task-set-desc.component.scss']
})
export class TaskSetDescComponent implements OnInit, AfterViewInit {

  originalDesc: string;

  @Input() descFormControl: FormControl;
  @ViewChild('taskDesc') taskDesc: ElementRef;

  constructor(private notifier: NotifierService) { }

  ngOnInit(): void {
    this.originalDesc = this.descFormControl.value;
  }

  ngAfterViewInit(): void {
    this.taskDesc.nativeElement.value = this.descFormControl.value;
    this.adjustHeight();
  }
  
  onChange(): void {
    this.notifier.genericNotify(
      this.notifier.taskEditDescSubject, 
      this.descFormControl.value != this.originalDesc
    );
    this.adjustHeight();
  }
  
  adjustHeight() {
    this.taskDesc.nativeElement.style.height = 'auto';
    if (this.taskDesc.nativeElement.scrollHeight < 40) { // 4 rows
      this.taskDesc.nativeElement.style.height = this.taskDesc.nativeElement.scrollHeight+'px';
    } else {
      this.taskDesc.nativeElement.style.height = '50px';
    }
  }
}
