import { Component, OnInit, Inject } from '@angular/core';
import { Filters } from '../filters';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { NotifierService, RepollData } from '../../services/notifier.service'

@Component({
  selector: 'app-task-filters',
  templateUrl: './task-filters.component.html',
  styleUrls: ['./task-filters.component.scss']
})
export class TaskFiltersComponent implements OnInit {

  filters: Filters;

  constructor(
    private bottomSheet: MatBottomSheet,
    private NotifierService: NotifierService
  ) { }

  ngOnInit(): void {
    this.filters = {
      dueDate: 'default',
      dueDateDisplay: 'Any Date',
      showCompleted: false
    }
    this.NotifierService.notify({ filters: this.filters});
  }

  openDueDateSheet(): void {
    const bottomSheetRef = this.bottomSheet.open(DueDateFilterSheet, { data: this.filters});
  }
  toggleCompleted() {
    this.filters.showCompleted = !this.filters.showCompleted;
    this.NotifierService.notify(<RepollData>{});
  }
}

@Component({
  selector: 'due-date-filter-sheet',
  templateUrl: 'due-date-filter-sheet.html',
  styleUrls: ['./task-filters.component.scss']
})
export class DueDateFilterSheet {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Filters,
    private bottomSheetRef: MatBottomSheetRef<DueDateFilterSheet>,
    private NotifierService: NotifierService
  ) {}

  changeDueDate(code: string, displayText: string): void {
    if (this.data.dueDate != code) {
      this.data.dueDate = code;
      this.data.dueDateDisplay = displayText;
      this.bottomSheetRef.dismiss();
      this.NotifierService.notify(<RepollData>{});
    }
  }
}