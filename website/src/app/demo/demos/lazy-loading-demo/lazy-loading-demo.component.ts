import {Component, OnDestroy, OnInit} from '@angular/core';
import {Demo} from '../demos';
import {LoggerService} from './logger.service';
import {filter, map, scan} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Demo({
  id: 'lazy-loading',
  title: 'Lazy Loading',
  description: 'An example of using ngxPaneContent to lazy load pane content.',
  order: 3,
  tags: ['Lazy Loading']
})
@Component({
  selector: 'app-lazy-loading-demo',
  templateUrl: './lazy-loading-demo.component.html',
  styleUrls: ['./lazy-loading-demo.component.scss'],
  providers: [
    LoggerService
  ]
})
export class LazyLoadingDemoComponent implements OnInit, OnDestroy {
  logs: string[];
  private logs$: Observable<string[]>;
  private subscription: Subscription;

  constructor(public logger: LoggerService) {
    this.logs$ = logger.logs$.pipe(
      filter(i => i),
      scan<string, string[]>((acc, item) => [].concat(acc).concat([item])),
      map(item => Array.isArray(item) ? item : [item]));
  }

  ngOnInit() {
    // This boilerplate subscription code could be replaced with a nice async pipe, but, it's throwing the
    // familiar "Cannot read property 'name' of undefined" error which I have no idea about it for now.
    // the setTimeout fixes the problem.
    this.subscription = this.logs$.subscribe(logs => {
      setTimeout(() => {
        this.logs = logs;
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
