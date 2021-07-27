import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { NotifierService, RepollData } from '../../services/notifier.service'
import { FiltersService } from 'src/app/services/filters.service';

@Component({
  selector: 'app-task-filters',
  templateUrl: './task-filters.component.html',
  styleUrls: ['./task-filters.component.scss']
})
export class TaskFiltersComponent implements OnInit {

  @ViewChild('dueDateChip') dueDateChip: ElementRef;
  @ViewChild('showCompletedChip') showCompletedChip: ElementRef;
  @ViewChild('listChip') listChip: ElementRef;

  constructor(
    private notifierService: NotifierService,
    public filtersService: FiltersService
  ) { }

  ngOnInit(): void {
  }

  toggleCompleted() {
    this.filtersService.filters.showCompleted = !this.filtersService.filters.showCompleted;
    this.notifierService.notify(<RepollData>{});
  }

  changeDueDate(code: string, displayText: string): void {
    if (this.filtersService.filters.dueDate.code != code) {
      this.filtersService.filters.dueDate.code = code;
      this.filtersService.filters.dueDate.displayText = displayText;
      this.notifierService.notify(<RepollData>{});
    }
  }

  resetDueDateFilter() {
    // @todo move this logic to filters service
    this.changeDueDate('default', 'All');
  }

  resetShowCompletedFilter() {
    this.toggleCompleted();
  }

  selectListFilter() {
    this.notifierService.listFilterClicked.emit();
  }

  selectDueDateFilter() {
    this.notifierService.dueDateFilterClicked.emit();
  }

  selectShowCompletedFilter() {
    this.notifierService.showCompletedFilterClicked.emit();
  }
}