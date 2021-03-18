import { Component, OnInit } from '@angular/core';
import { DateUtil } from 'src/app/utilities/date-util';

@Component({
  selector: 'app-todo-list',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  isScrolling: boolean = false;

  constructor() { }

  ngOnInit(): void {
    DateUtil.initDate();
  }
    
  onScroll(event): void {
    const scrollTopVal = event.target.scrollTop;
    if (scrollTopVal < 19) {
      this.isScrolling = false;
    } else {
      this.isScrolling = true;
    }
  }  
}
