import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <mat-progress-spinner mode="indeterminate"
                         [strokeWidth]="4"
                         *ngIf="loading"></mat-progress-spinner>
    <ng-content *ngIf="!loading"></ng-content>
  `,
  styleUrls: ['./loading.component.scss']
})
export class AppLoadingComponent {

  @HostBinding('class.loading')
  @Input() loading;

  constructor() {
  }

}
