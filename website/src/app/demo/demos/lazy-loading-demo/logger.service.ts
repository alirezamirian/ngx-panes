import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class LoggerService {

  private logsSubject = new BehaviorSubject('');
  logs$ = this.logsSubject.asObservable();

  constructor() {
  }

  log(...value: string[]) {
    this.logsSubject.next(value.join(' '));
  }


}
