import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { DateUtil } from 'src/app/utilities/date-util';
import { NotifierService } from '../services/notifier.service';
import { AddTaskSheetComponent } from './add-task-sheet/add-task-sheet.component';

enum Sidenav {
  LEFT,
  RIGHT
}
@Component({
  selector: 'app-todo-list',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss'],
})
export class MyTasksComponent implements OnInit, OnDestroy {

  hideToolbar: boolean;
  toolbarFixed: boolean;
  noAnimation: boolean;
  scrollSubject = new Subject<number>();
  prevScrollVal: number;
  Sidenav = Sidenav;
  showFiltersSubscription: Subscription;

  @ViewChild('drawer') drawer: MatDrawer; // @todo: change to drawerRight
  @ViewChild('drawerLeft') drawerLeft: MatDrawer;
  @ViewChild('headerDiv') header: ElementRef;

  constructor(
    private bottomSheet: MatBottomSheet,
    private notifierService: NotifierService
  ) { }

  ngOnDestroy(): void {
    this.showFiltersSubscription.unsubscribe();
  }

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
        if (scrollTopVal - this.prevScrollVal > 15) { //30
          this.hideToolbar = true;
        } else if (this.prevScrollVal - scrollTopVal > 15) { //30
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
    this.showFiltersSubscription = this.notifierService.showFilters.subscribe(() => {
      this.drawerLeft.open();
    });
  }
    
  onScroll(event: any): void {
    this.scrollSubject.next(event.target.scrollTop);
  }

  toggleSidenav(sidenav: Sidenav): void {
    if (sidenav === Sidenav.LEFT) {
      this.drawerLeft.toggle();
    }
    else {
      this.drawer.toggle();
    }
  }

  openAddTaskSheet(): void {
    const bottomSheetRef = this.bottomSheet.open(AddTaskSheetComponent);
  }

  closeFilterPanels(): void {
    this.notifierService.filtersSidebarClosing.emit();
  }
}
