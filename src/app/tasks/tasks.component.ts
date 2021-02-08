import { Component, OnInit } from '@angular/core';
import { DateUtil } from 'src/app/utilities/date-util';

@Component({
  selector: 'app-todo-list',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    DateUtil.initDate();
  }

}
