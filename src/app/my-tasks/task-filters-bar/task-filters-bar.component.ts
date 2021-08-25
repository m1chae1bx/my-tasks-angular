import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FiltersService } from 'src/app/services/filters.service';
import { ListService } from 'src/app/services/list.service';
import { NotifierService } from 'src/app/services/notifier.service';

@Component({
  selector: 'app-task-filters-bar',
  templateUrl: './task-filters-bar.component.html',
  styleUrls: ['./task-filters-bar.component.scss']
})
export class TaskFiltersBarComponent implements OnInit, OnDestroy {

  // listFilter = new FormControl();
  // dueDateFilter = new FormControl();
  dueDateOptions = [
    { code: 'default', displayText: 'All' },
    { code: 'overdue', displayText: 'Overdue' },
    { code: 'today', displayText: 'Today' },
    { code: 'tomorrow', displayText: 'Tomorrow' },
    { code: 'upcoming', displayText: 'Upcoming' },
    { code: 'unplanned', displayText: 'Unplanned' },
  ];
  listFilterClickedSubs: Subscription;
  dueDateFilterClickedSubs: Subscription;
  showCompletedFilterClickedSubs: Subscription;
  filterSidebarClosingSubs: Subscription;

  @ViewChild('listPanel') listPanel: MatExpansionPanel;
  @ViewChild('dueDatePanel') dueDatePanel: MatExpansionPanel;
  @ViewChild('showCompletedPanel') showCompletedPanel: MatExpansionPanel;

  constructor(
    public listService: ListService,
    public authService: AuthService,
    public filterService: FiltersService,
    private notifierService: NotifierService
  ) { }

  /* Angular Lifecycle */
  ngOnInit(): void {
    this.listService.getLists();
    this.listFilterClickedSubs = this.notifierService.listFilterClicked.subscribe(() => {
      this.listPanel.open();
    });
    this.dueDateFilterClickedSubs = this.notifierService.dueDateFilterClicked.subscribe(() => {
      this.dueDatePanel.open();
    });
    this.showCompletedFilterClickedSubs = this.notifierService.showCompletedFilterClicked.subscribe(() => {
      this.showCompletedPanel.open();
    });
    this.filterSidebarClosingSubs = this.notifierService.filtersSidebarClosing.subscribe(() => {
      this.closePanels();
    });
  }

  ngOnDestroy(): void {
    this.listFilterClickedSubs.unsubscribe();
    this.dueDateFilterClickedSubs.unsubscribe();
    this.showCompletedFilterClickedSubs.unsubscribe();
    this.filterSidebarClosingSubs.unsubscribe();
  }

  updateListFilter(listId: string, name: string) {
    this.filterService.setListFilter(listId, name);
  }

  updateDueDateFilter(dueDate: string, displayText: string) {
    this.filterService.setDueDateFilter(dueDate, displayText);
  }

  toggleShowCompleted() {
    this.filterService.toggleShowCompleted();
  }

  showFilters() {
    this.notifierService.showFilters.emit();
  }

  closePanels() {
    this.listPanel.close();
    this.dueDatePanel.close();
    this.showCompletedPanel.close();
  }
}
