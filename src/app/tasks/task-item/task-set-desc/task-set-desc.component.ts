import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from 'src/app/services/notifier.service';
import { Task } from '../../task';

@Component({
  selector: 'app-task-set-desc',
  templateUrl: './task-set-desc.component.html',
  styleUrls: ['./task-set-desc.component.scss']
})
export class TaskSetDescComponent implements OnInit, AfterViewInit {

  originalDesc: string;

  @Input() task: Task;
  @ViewChild('taskDesc') taskDesc: ElementRef;

  constructor(private notifier: NotifierService) { }

  ngOnInit(): void {
    this.originalDesc = this.task.desc;
  }

  ngAfterViewInit(): void {
    this.taskDesc.nativeElement.value = this.task.desc;
    this.adjustHeight();
  }
  
  onChange(): void {
    this.notifier.genericNotify(
      this.notifier.taskEditDescSubject, 
      this.task.desc != this.originalDesc
    );
    this.adjustHeight();
  }
  
  adjustHeight() {
    this.taskDesc.nativeElement.style.height = 'auto';
    if (this.taskDesc.nativeElement.scrollHeight < 53) { // 4 rows
      this.taskDesc.nativeElement.style.height = this.taskDesc.nativeElement.scrollHeight+'px';
    } else {
      this.taskDesc.nativeElement.style.height = '64px';
    }
  }
}
