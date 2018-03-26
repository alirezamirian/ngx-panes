import {Directive, HostBinding, Optional} from '@angular/core';
import {DefaultScrollbarsDirective} from './default-scrollbars.directive';


@Directive({
  selector: '[scrollable]'
})
export class ScrollableDirective {

  @HostBinding('class.ngx-panes-scrollbars')
  get applyStyles(): boolean {
    return !this.defaultScrollbars || !this.defaultScrollbars.enabled;
  }

  constructor(@Optional() private defaultScrollbars: DefaultScrollbarsDirective) {
  }
}
