import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, AfterContentChecked } from '@angular/core';
import { NotifierService } from 'src/app/services/notifier.service';
import { Task } from '../../task';

@Component({
  selector: 'app-task-set-name',
  templateUrl: './task-set-name.component.html',
  styleUrls: ['./task-set-name.component.scss']
})
export class TaskSetNameComponent implements OnInit, AfterViewInit {

  originalName: string;

  @Input() task: Task;
  @ViewChild('taskName') taskName: ElementRef;

  constructor(private notifier: NotifierService) {}

  ngOnInit(): void {
    this.originalName = this.task.name;
  }

  ngAfterViewInit(): void {
    this.taskName.nativeElement.value = this.task.name;
    this.adjustHeight();
  }

  onChange() {
    this.notifier.genericNotify(
      this.notifier.taskEditNameSubject, 
      this.task.name != this.originalName
    );
    this.adjustHeight();
  }

  onBlur() {
    if (!this.task.name) this.task.name = this.originalName;
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
