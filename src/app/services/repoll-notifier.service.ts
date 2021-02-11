import { Observable, ReplaySubject } from 'rxjs';
import { Filters } from '../tasks/filters';

export class RepollNotifierService {

    subject: ReplaySubject<any> = new ReplaySubject();
    obs: Observable<any> = this.subject.asObservable();
  
    notify = (data?: RepollData) => {
      this.subject.next(data)
    }
}

interface RepollData {
  name?: string;
  filters?: Filters;
}
  