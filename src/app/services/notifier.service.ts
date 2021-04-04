import { Observable, ReplaySubject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Filters } from '../tasks/filters';

export class NotifierService {

  taskListSubject: ReplaySubject<any> = new ReplaySubject();
  taskListObs: Observable<any> = this.taskListSubject.asObservable();

  taskEditNameSubject: ReplaySubject<any> = new ReplaySubject();
  taskEditNameObs: Observable<any> = this.taskEditNameSubject.asObservable();
  taskEditDescSubject: ReplaySubject<any> = new ReplaySubject();
  taskEditDescObs: Observable<any> = this.taskEditDescSubject.asObservable();
  taskEditDueDateSubject: ReplaySubject<any> = new ReplaySubject();
  taskEditDueDateObs: Observable<any> = this.taskEditDueDateSubject.asObservable();


  notify = (data: RepollData) => {
    this.taskListSubject.next(data)
  }

  genericNotify(subject: ReplaySubject<any>, data: any): void {
    subject.next(data);
  }
}

export interface RepollData {
  name?: string;
  filters?: Filters;
}
  