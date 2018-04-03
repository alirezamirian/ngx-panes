import {Directive} from '@angular/core';
import {PaneAreaStateManager} from '../pane-area-state-manager';
import {LocalStoragePaneAreaStateManager} from './local-storage-state-manager.service';

/**
 * Provides an instance of {@link LocalStoragePaneAreaStateManager} to be used by the
 * {@link PaneAreaComponent pane-area} as {@link PaneAreaStateManager}.
 *
 * @usage
 * <ngx-pane-area ngxLocalStorageStateManager>
 *   ...
 * </ngx-pane-area>
 */
@Directive({
  selector: 'ngx-pane-area[ngxLocalStorageStateManager]',
  providers: [
    {
      provide: PaneAreaStateManager,
      useClass: LocalStoragePaneAreaStateManager
    }
  ]
})
export class LocalStorageStateManagerDirective {

}
