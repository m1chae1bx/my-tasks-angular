import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filters } from '../filters';

@Component({
  selector: 'app-task-filters',
  templateUrl: './task-filters.component.html',
  styleUrls: ['./task-filters.component.scss']
})
export class TaskFiltersComponent implements OnInit {

  @Input() filters: Filters; // @todo change type from any to string
  @Output() filtersChange = new EventEmitter<Filters>();

  constructor() { }

  ngOnInit(): void {
  }

  changeDueDate(code: any): void {
    if (this.filters.dueDate != code) {
      this.filters.dueDate = code;
      this.filtersChange.emit(this.filters);
    }
  }

  toggleCompleted() {
    this.filters.showCompleted = !this.filters.showCompleted;
    this.filtersChange.emit(this.filters);
  }

}