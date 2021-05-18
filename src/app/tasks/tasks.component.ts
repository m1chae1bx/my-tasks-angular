import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { DateUtil } from 'src/app/utilities/date-util';
import { AddTaskSheetComponent } from './add-task-sheet/add-task-sheet.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {

  hideToolbar: boolean;
  toolbarFixed: boolean;
  noAnimation: boolean;
  scrollSubject = new Subject<number>();
  prevScrollVal: number;

  @ViewChild('drawer') drawer: MatDrawer;
  @ViewChild('headerDiv') header: ElementRef;

  constructor(
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    DateUtil.initDate(); // @todo: Create a warning if DateUtil is not initialized
    this.hideToolbar = false;
    this.prevScrollVal = 0;
    this.toolbarFixed = false;
    this.noAnimation = true;
    this.scrollSubject.pipe(
      throttleTime(400, undefined, {leading: true, trailing: true})
    ).subscribe(scrollTopVal => {
      if (scrollTopVal > 300){
        if (scrollTopVal - this.prevScrollVal > 30) {
          this.hideToolbar = true;
        } else if (this.prevScrollVal - scrollTopVal > 30) {
          this.noAnimation = false;
          this.hideToolbar = false;
        }
      } else {
        if (this.toolbarFixed) this.noAnimation = false;
        this.hideToolbar = false;
      }
      if (scrollTopVal > 300) {
        this.toolbarFixed = true;
      } 
      else if (scrollTopVal === 0) {
        this.toolbarFixed = false;
        this.noAnimation = true;
      }
      this.prevScrollVal = scrollTopVal;
    });
  }
    
  onScroll(event: any): void {
    this.scrollSubject.next(event.target.scrollTop);
  }

  toggleSidenav(): void {
    this.drawer.toggle();
  }

  openAddTaskSheet(): void {
    const bottomSheetRef = this.bottomSheet.open(AddTaskSheetComponent);
  }
}
