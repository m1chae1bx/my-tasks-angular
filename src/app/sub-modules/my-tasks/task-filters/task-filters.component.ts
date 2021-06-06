import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Filters } from '../filters';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { NotifierService, RepollData } from '../../../services/notifier.service'

@Component({
  selector: 'app-task-filters',
  templateUrl: './task-filters.component.html',
  styleUrls: ['./task-filters.component.scss']
})
export class TaskFiltersComponent implements OnInit {

  filters: Filters;

  @ViewChild('dueDateChip') dueDateChip: ElementRef;
  @ViewChild('showCompletedChip') showCompletedChip: ElementRef;
  @ViewChild('listChip') listChip: ElementRef;

  constructor(
    private NotifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.filters = {
      dueDate: 'default',
      dueDateDisplay: 'Due Date',
      showCompleted: false
    }
    this.NotifierService.notify({ filters: this.filters});
  }


  toggleCompleted() {
    this.filters.showCompleted = !this.filters.showCompleted;
    this.NotifierService.notify(<RepollData>{});
  }

  onFocus(event: FocusEvent): void {
    //event.preventDefault();
    this.listChip.nativeElement.blur();
    this.dueDateChip.nativeElement.blur();  
    this.showCompletedChip.nativeElement.blur();
  }

  changeDueDate(code: string, displayText: string): void {
    if (this.filters.dueDate != code) {
      this.filters.dueDate = code;
      this.filters.dueDateDisplay = displayText;
      //this.bottomSheetRef.dismiss();
      this.NotifierService.notify(<RepollData>{});
    }
  }
}