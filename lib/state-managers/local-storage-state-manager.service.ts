import {Injectable} from '@angular/core';
import {PaneAreaComponent} from '../pane-area/pane-area.component';
import {Observable} from 'rxjs/Observable';
import {PaneAreaStateManager} from '../pane-area-state-manager';
import {libLogger} from '../utils/lib-logger';
import {PaneAreaState} from '../pane-area/types';

/**
 * A {@link PaneAreaStateManager} service, which saves/loads pane area state in
 * [browser's local storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage).
 * It requires pane areas to have a unique {@link PaneAreaComponent#id id}.
 *
 * It's **not provided** by default by {@link NgxPanesModule}, but you can provide it in your own angular
 * module and it will be used by all `ngx-pane-area` components.
 * Alternatively you can use {@link LocalStorageStateManagerDirective ngxLocalStorageStateManager}
 * on `ngx-pane-area`. It will provide an instance of {@link LocalStoragePaneAreaStateManager} to pane area.
 *
 */
@Injectable()
export class LocalStoragePaneAreaStateManager extends PaneAreaStateManager {

  getSavedState(paneArea: PaneAreaComponent): PaneAreaState | null {
    if (!paneArea.id) {
      libLogger.warn(`LocalStoragePaneAreaStateManager needs paneArea to have an id. It's not going to work!`);
      return;
    }
    return JSON.parse(localStorage.getItem(this.getKey(paneArea)));
  }

  clearHistory(paneArea: PaneAreaComponent) {
    localStorage.removeItem(this.getKey(paneArea));
  }

  trackChanges(paneArea: PaneAreaComponent, state$: Observable<PaneAreaState>) {
    state$.subscribe(history => {
      if (paneArea.id) {
        localStorage.setItem(this.getKey(paneArea), JSON.stringify(history));
      }
    });
  }

  private getKey(paneArea: PaneAreaComponent) {
    return `__NGX_PANES_HISTORY_${paneArea.id}`;
  }

}
