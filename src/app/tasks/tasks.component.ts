import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DateUtil } from 'src/app/utilities/date-util';

@Component({
  selector: 'app-todo-list',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  isScrolling: boolean;

  @ViewChild('drawer') drawer: MatDrawer;

  constructor() { }

  ngOnInit(): void {
    DateUtil.initDate(); // @todo: Create a warning if DateUtil is not initialized
    this.isScrolling = false;
  }
    
  onScroll(event: any): void {
    const scrollTopVal = event.target.scrollTop;
    if (scrollTopVal < 19) {
      this.isScrolling = false;
    } else {
      this.isScrolling = true;
    }
  }

  toggleSidenav(): void {
    this.drawer.toggle();
  }
}
