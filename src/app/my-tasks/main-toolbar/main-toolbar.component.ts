import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NotifierService } from 'src/app/services/notifier.service';
import { SearchTaskComponent } from 'src/app/my-tasks/search-task/search-task.component';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss'],
  animations: [
    trigger('fadeInSimple', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ])
    ]),
  ]
})
export class MainToolbarComponent implements OnInit {

  isSearching: boolean;
  isTitleVisible: boolean;

  @Output() menuClicked = new EventEmitter();
  @ViewChild('searchBox') searchBox: SearchTaskComponent;
  @ViewChild('titleText') titleText: ElementRef;
  
  constructor(private notifierService: NotifierService) { }

  ngOnInit(): void {
    this.isSearching = false;
    this.isTitleVisible = true;
    this.notifierService.taskListObs.subscribe(data => {
      if (data.name) {
        this.isSearching = true;
      }
    });
  }

  toggleSearch(): void {
    this.isSearching = !this.isSearching;
    (this.titleText.nativeElement as HTMLSpanElement).classList.add('reappear');
    this.searchBox.resetTask();
    this.searchBox.toggleFocus(true);
  }

  toggleSidenav(): void {
    this.menuClicked.emit(null);
  }
}
