import { Observable, ReplaySubject } from 'rxjs';
import { Filters } from '../tasks/filters';

export class NotifierService {

    taskListSubject: ReplaySubject<any> = new ReplaySubject();
    taskListObs: Observable<any> = this.taskListSubject.asObservable();
  
    notify = (data: RepollData) => {
      this.taskListSubject.next(data)
    }
}

export interface RepollData {
  name?: string;
  filters?: Filters;
}
  