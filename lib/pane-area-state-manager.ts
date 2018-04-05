import {PaneAreaComponent, PaneAreaState} from './pane-area/pane-area.component';
import {Observable} from 'rxjs/Observable';


/**
 * An abstract class, used as DI token for pane area state manager service.
 * Each instance of {@link PaneAreaComponent} will look for a provided
 * `PaneAreaStateManager` to use for loading previously saved state and saving
 * state changes whenever a pane is moved to another position or another pane group.
 *
 * Currently, this **state** is only limited to position of panes inside pane groups.
 * Because it's the only tricky part of state management which is hard to handle in
 * static templates.
 * Other things such as **last opened pane in each pane group** or **size of each pane**
 * is not currently handled by this state management mechanism and should be handled by
 * corresponding inputs like {@link PaneComponent#size PaneComponent size input}.
 *
 * {@link LocalStoragePaneAreaStateManager} is the default implementation of
 * `PaneAreaStateManager`, which is shipped with the library but not provided by `NgxPanesModule`.
 * You can provide it (or some other implementation) for `PanePaneAreaStateManager` DI token.
 * You can alternatively use {@link LocalStorageStateManagerDirective localStorageStateManager directive}
 * on `ngx-pane-area`, which provides an instance of {@link LocalStoragePaneAreaStateManager} to pane area.
 *
 * {@link PaneAreaState} is a simple map from {@link PaneComponent Pane} ids to
 * {@link PaneState} objects which represents the id of {@link PaneGroupComponent PaneGroup}
 * for this pane and position of the pane inside that paneGroup. So, for `PaneAreaStateManager` to work,
 * **it's necessary to give an id to each pane group and each pane inside it**.
 *
 * See also [state management guide](/guides/state-management).
 */
export abstract class PaneAreaStateManager {

  /**
   * Sync or Async method used for retrieving previously saved state of the given pane area.
   * @param {PaneAreaComponent} paneArea
   * @returns {PaneAreaState | Promise<PaneAreaState>}
   */
  abstract getSavedState(paneArea: PaneAreaComponent): PaneAreaState | Promise<PaneAreaState> | null;

  /**
   * Given a `paneArea` and an observable of its state changes, this method is responsible for
   * storing and loading its state. Whether it stores every emitted changed state or a subset of them using
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

