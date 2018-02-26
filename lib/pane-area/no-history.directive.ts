import {Directive} from '@angular/core';
import {NoopPaneAreaStateManager, PaneAreaStateManager} from '../pane-area-state-manager';

/**
 * Overrides default {@link LocalStoragePaneAreaStateManager} (or any other provided
 * {@link PaneAreaStateManager}) and provides a {@link NoopPaneAreaStateManager}
 * for pane-area. Use it on {@link PaneAreaComponent pane-area} to disable state
 * history tracking.
 *
 * @usage
 * <ngx-pane-area noHistory>
 *   ...
 * </ngx-pane-area>
 */
@Directive({
  selector: 'ngx-pane-area[noHistory]',
  providers: [
    {
      provide: PaneAreaStateManager,
      useClass: NoopPaneAreaStateManager
    }
  ]
})
export class NoHistoryDirective {

}
