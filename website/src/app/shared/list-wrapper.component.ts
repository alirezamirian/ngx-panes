import {Component, Input} from '@angular/core';

/**
 * Created by alireza on 6/1/17.
 */


@Component({
  selector: 'app-list-wrapper',
  template: `
    <div *ngIf="items?.length === 0; else content" class="placeholder">Nothing to show</div>
    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>`,
  styles: [
      `.placeholder {
      padding: 15px 0;
      text-align: center;
      color: rgba(0, 0, 0, .4);
    }`
  ]
})
export class ListWrapperComponent {

  @Input()
  items: any[];

  constructor() {
  }
}
