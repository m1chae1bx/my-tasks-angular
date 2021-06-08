import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Filters } from '../my-tasks/filters';
import { Task } from '../my-tasks/task';

export class NotifierService {

  taskListSubject: Subject<any> = new Subject();
  taskListObs: Observable<any> = this.taskListSubject.asObservable();

  taskEditNameSubject: ReplaySubject<any> = new ReplaySubject();
  taskNameChanged: Observable<any> = this.taskEditNameSubject.asObservable();
  taskEditDescSubject: ReplaySubject<any> = new ReplaySubject();
  taskDescChanged: Observable<any> = this.taskEditDescSubject.asObservable();
  taskEditDueDateSubject: ReplaySubject<any> = new ReplaySubject();
  taskDueDateChanged: Observable<any> = this.taskEditDueDateSubject.asObservable();
  taskIsDoneSubject: ReplaySubject<boolean> = new ReplaySubject();
  taskIsDoneChanged: Observable<boolean> = this.taskIsDoneSubject.asObservable();

  taskUpdatedSubject: Subject<Task> = new Subject();
  taskUpdated: Observable<Task> = this.taskUpdatedSubject.asObservable();
  taskAddedSubject: Subject<Task> = new Subject();
  taskAdded: Observable<Task> = this.taskAddedSubject.asObservable();

  notify = (data: RepollData) => {
    this.taskListSubject.next(data)
  }

  genericNotify(subject: Subject<any>, data: any): void {
    subject.next(data);
  }
}

export interface RepollData {
  name?: string;
  filters?: Filters;
}
  