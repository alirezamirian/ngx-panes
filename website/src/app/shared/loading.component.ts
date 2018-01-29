import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <mat-progress-spinner mode="indeterminate"
                         [strokeWidth]="4"
                         *ngIf="loading"></mat-progress-spinner>
    <ng-content *ngIf="!loading"></ng-content>
  `,
  styles: [
      `
      :host {
        height: 100%;
        display: block;
      }

      mat-progress-spinner {
        margin: auto;
        width: 50px;
        height: 100%;
      }`
  ]
})
export class AppLoadingComponent {

  @Input() loading;

  constructor() {
  }

}
