import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Filters } from '../my-tasks/filters';
import { ListService } from './list.service';
import { NotifierService } from './notifier.service';
import { SessionService } from './session.service';

@Injectable()
export class FiltersService {

  private _filters: Filters = null;//{ list: { id: "", name: "Loading..."}, dueDate: { code: "default", displayText: "All" }, showCompleted: false};
  get filters(): Readonly<Filters> {
    return this._filters;
  }

  private _filters$ = new BehaviorSubject<Readonly<Filters>>(this._filters);
  get filters$(): Observable<Readonly<Filters>> {
    return this._filters$.asObservable();
  }

  constructor(
    private notifierService: NotifierService,
    private sessionService: SessionService,
    private listService: ListService
  ) { 
    const user = this.sessionService.getUser();
    this.listService.getList(user.preferences.defaultListId).subscribe(list => {
      this._filters = {
        list: { id: list.id, name: list.name}, // to prevent errors, create component that will check integrity of user
        dueDate: { code: 'default', displayText: 'All' },
        showCompleted: false
      };
      console.log("_filters", this._filters);
      this.notify();
    });
  }

  private notify() {
    this._filters$.next(this._filters);
  }

  setListFilter(listId: string, name: string) {
    this._filters.list = {
      id: listId,
      name: name
    };
    this.notify();
  }

  setDueDateFilter(code: string, displayText: string) {
    this._filters.dueDate.code = code;
    this._filters.dueDate.displayText = displayText;
    this.notify();
  }

  toggleShowCompleted() {
    this._filters.showCompleted = !this._filters.showCompleted;
    this.notify();
  }
}
