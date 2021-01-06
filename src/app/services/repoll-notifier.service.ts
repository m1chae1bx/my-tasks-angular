import { Observable, ReplaySubject } from 'rxjs';

export class RepollNotifierService {

    subject: ReplaySubject<any> = new ReplaySubject();
    obs: Observable<any> = this.subject.asObservable();
  
    notify = (data: any) => {
      this.subject.next(data)
    }
}