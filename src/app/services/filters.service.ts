import { Injectable } from '@angular/core';
import { Filters } from '../my-tasks/filters';
import { NotifierService } from './notifier.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  filters: Filters;

  constructor(
    private notifierService: NotifierService,
    private sessionService: SessionService
  ) { 
    const user = this.sessionService.getUser();
    this.filters = {
      list: { id: user.preferences.defaultList.id, name: user.preferences.defaultList.name}, // to prevent errors, create component that will check integrity of user
      dueDate: { code: 'default', displayText: 'All' },
      showCompleted: false
    }
  }

  setListFilter(listId: string, name: string) {
    this.filters.list = {
      id: listId,
      name: name
    };
    this.notifierService.notify();
  }

  setDueDateFilter(code: string, displayText: string) {
    this.filters.dueDate.code = code;
    this.filters.dueDate.displayText = displayText;
    this.notifierService.notify();
  }

  toggleShowCompleted() {
    this.filters.showCompleted = !this.filters.showCompleted;
    this.notifierService.notify();
  }
}
