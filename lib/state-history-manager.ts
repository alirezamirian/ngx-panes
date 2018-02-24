import {Injectable} from '@angular/core';
import {PaneAreaComponent, PaneAreaState} from './pane-area/pane-area.component';
import {Observable} from 'rxjs/Observable';


/**
 * An abstract class, used as DI token for pane area state manager service.
 * {@link LocalStoragePaneAreaStateManager} is the default implementation, which
 * is provided by {@link NgxPanesModule} out of the box.
 * You can provide other implementations to be used instead of local storage.
 * A common use case is a service which loads and saves state via a backend API.
 */
export abstract class PaneAreaStateManager {

  /**
   * Sync or Async method used for retrieving previously saved state of the given pane area.
   * @param {PaneAreaComponent} paneArea
   * @returns {PaneAreaState | Promise<PaneAreaState>}
   */
  abstract getSavedState(paneArea: PaneAreaComponent): PaneAreaState | Promise<PaneAreaState>;

  /**
   * Given a `paneArea` and an observable of its state changes, this method is responsible for
   * storing its state. Whether it stores every emitted changed state or a subset of them using
   * Rxjs operators like
   * [last](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-last) or,
   * [debounceTime](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-debounceTime),
   * is an implementation decision, left to
   * actual implementor, to be taken based on costs or other considerations. Default
   * {@link LocalStoragePaneAreaStateManager} stores every changed state.
   * @param {PaneAreaComponent} paneArea The pane area component to track its changes.
   * @param {Observable<PaneAreaState>} state$ Observable of changes.
   */
  abstract trackChanges(paneArea: PaneAreaComponent, state$: Observable<PaneAreaState>): void;

  /**
   * clears previously stored pane area state.
   * @param {PaneAreaComponent} paneArea
   */
  abstract clearHistory(paneArea: PaneAreaComponent): void;
}

/**
 * Default {@link PaneAreaStateManager} service provided by {@link NgxPanesModule},
 * which saves/loads pane area state in
 * [browser's local storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage).
 * It requires pane areas to have a unique {@link PaneAreaComponent#id id}.
 */
@Injectable()
export class LocalStoragePaneAreaStateManager extends PaneAreaStateManager {

  getSavedState(paneArea: PaneAreaComponent): PaneAreaState {
    return JSON.parse(localStorage.getItem(this.getKey(paneArea)));
  }

  clearHistory(paneArea: PaneAreaComponent) {
    localStorage.removeItem(this.getKey(paneArea));
  }

  trackChanges(paneArea: PaneAreaComponent, state$: Observable<PaneAreaState>) {
    state$.subscribe(history => {
      localStorage.setItem(this.getKey(paneArea), JSON.stringify(history));
    });
  }

  private getKey(paneArea: PaneAreaComponent) {
    return `__NGX_PANES_HISTORY_${paneArea.id}`;
  }

}
