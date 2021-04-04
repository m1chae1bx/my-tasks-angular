import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DateUtil } from 'src/app/utilities/date-util';

@Component({
  selector: 'app-todo-list',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  animations: [
    // trigger('fadeSlideInFromLeft', [
    //   transition(':enter', [
    //     style({ opacity: 0, transform: 'translateX(-5px)' }),
    //     animate('100ms', style({ opacity: 1, transform: 'translateX(0)' })),
    //   ])
    //   // ,
    //   // transition(':leave', [
    //   //   animate('100ms', style({ opacity: 0, transform: 'translateX(-5px)' })),
    //   // ]),
    // ]),
    trigger('fadeSlideInOutRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(2px)' }),
        animate('100ms', style({ opacity: 1, transform: 'translateX(0)' })),
      ])
      ,
      transition(':leave', [
        animate('100ms', style({ opacity: 0, transform: 'translateX(2px)' })),
        // animate('50ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('fadeInSimple', [
      transition(':enter', [
        style({ opacity: 0 }),
        // animate('10000ms'),
        animate('100ms', style({ opacity: 1 })),
      ])
      // ,
      // transition(':leave', [
      //   animate('100ms', style({ opacity: 0 })),
      // ]),
    ]),
  ]
})
export class TasksComponent implements OnInit {

  isScrolling: boolean;
  isSearching: boolean;
  isTitleVisible: boolean;

  // @ViewChild('searchInput') searchInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
    DateUtil.initDate();
    this.isSearching = false;
    this.isScrolling = false;
    this.isTitleVisible = true;
  }
    
  onScroll(event): void {
    const scrollTopVal = event.target.scrollTop;
    if (scrollTopVal < 19) {
      this.isScrolling = false;
    } else {
      this.isScrolling = true;
    }
  }
  
  toggleSearch(): void {
    this.isSearching = !this.isSearching;
    // this.searchInput.nativeElement.focus();
  }

  hideTitleBar(): void {
    this.isTitleVisible = false;
  }

  showTitleBar(event: any): void {
    // console.log(event);
    if (event.toState === 'void') {
      this.isTitleVisible = !this.isTitleVisible;
    }
  }
}
