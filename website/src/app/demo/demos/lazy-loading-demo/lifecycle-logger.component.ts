import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LoggerService} from './logger.service';

@Component({
  selector: 'app-lifecycle-logger',
  template: '<ng-content></ng-content>'
})
export class LifecycleLoggerComponent implements OnInit, OnDestroy {

  @Input()
  name: string;

  constructor(private logger: LoggerService) {
  }

  ngOnInit() {
    this.logger.log(this.name, ' [ngOnInit]');
  }

  ngOnDestroy() {
    this.logger.log(this.name, ' [ngOnDestroy]');
  }

}
