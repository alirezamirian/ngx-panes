import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Inject,
  Input,
  Optional,
  Output,
  QueryList
} from '@angular/core';
import {Align} from '../utils/rtl-utils';
import {PaneGroupComponent} from '../pane-group/pane-group.component';
import {Move, PaneTabDragDropContext} from '../pane-tab-drag-drop-context';
import {PaneComponent} from '../pane/pane.component';
import {PaneAreaStateManager} from '../pane-area-state-manager';
import {libLogger} from '../utils/lib-logger';
import {NGX_PANES_DEFAULTS, NgxPanesDefaults} from '../panes-config';
import {PaneAreaState, PanePosition, PanePositions, Side} from './types';
import {map} from 'rxjs/operators';


/**
 * Defines an area consisted of a centered main content surrounded by
 * up to 4 side pane groups (aka tool windows).
 *
 * Any child element which is not {@link PaneGroupComponent ngx-pane-group} is
 * projected as main content.
 *
 * @usage
 * <ngx-pane-area>
 *   <ngx-pane-group> ... </ngx-pane-group>
 *   <ngx-pane-group> ... </ngx-pane-group>
 *   <div>
 *     <!-- will be projected as main content -->
 *   </div>
 * </ngx-pane-area>
 */
@Component({
  selector: 'ngx-pane-area',
  templateUrl: './pane-area.component.html',
  styleUrls: ['./pane-area.component.scss'],
  providers: [
    PaneTabDragDropContext
  ]
})
export class PaneAreaComponent implements AfterContentInit {

  /**
   * Unique identifier for this pane area. Used by {@link LocalStoragePaneAreaStateManager}
   * to store pane area state.
   */
  @Input()
  id: string;
  /**
   * Whether user should be able to reorder panes in a pane group (or move panes between
   * pane groups) by dragging their tabs.
   * For now there is no separate options for reordering and moving to another pane group, as
   * such option doesn't seem to be necessary.
   * @type {boolean}
   */
  @Input()
  tabsDraggable = true;

  /** @private */
  left: Side = {paneGroup: null};
  /** @private */
  right: Side = {paneGroup: null};
  /** @private */
  bottom: Side = {paneGroup: null};
  /** @private */
  top: Side = {paneGroup: null};
  /**
   * @private
   */
  @ContentChildren(PaneGroupComponent)
  paneGroups: QueryList<PaneGroupComponent>;
  private aligns: Align[] = ['left', 'right', 'bottom', 'top'];


  /**
   * Event emitted when arrangement of panes has changed.
   * @type {EventEmitter<PanePositions>}
   * @experimental
   */
  @Output()
  panePositionsChange: EventEmitter<PanePositions> = new EventEmitter<PanePositions>();

  /**
   * Position and order of panes inside pane groups, to override default arrangement based on template.
   * While it's possible to pass it via inputs, it's normally not the case, and {@link PaneAreaStateManager}
   * will handle it.
   * @experimental
   */
  @Input()
  panePositions: PanePositions = {};

  constructor(private dragDropContext: PaneTabDragDropContext,
              @Optional() @Inject(NGX_PANES_DEFAULTS) defaults: NgxPanesDefaults,
              @Optional() private stateManager: PaneAreaStateManager) {
    if (defaults) {
      if (defaults.draggable != null) {
        this.tabsDraggable = defaults.draggable;
      }
    }
  }

  ngAfterContentInit(): void {
    if (this.stateManager) {
      const stateChanges = this.panePositionsChange.pipe(
        map<PanePositions, PaneAreaState>(panePositions => ({panePositions}))
      );
      this.stateManager.trackChanges(this, stateChanges);
      Promise.resolve(this.stateManager.getSavedState(this)).then((state: PaneAreaState) => {
        this.panePositions = state ? state.panePositions || {} : {};
        this.initialize();
      });
    } else {
      this.initialize();
    }
  }

  private initialize() {
    this.paneGroups.changes.subscribe(() => this.syncGroups());
    this.syncGroups();
    this.dragDropContext.moves$.subscribe((move: Move) => {
      if (move.from === move.to) {
        this.movePane(move.from, move.pane, move.toIndex);
      } else {
        this.addPane(move.to, move.pane, move.toIndex);
        this.removePane(move.from, move.pane);
      }
      move.pane.open();
    });
  }

  setPanes(paneGroup: PaneGroupComponent, panes: PaneComponent[]) {
    paneGroup.setPanes(panes);
    panes.forEach((pane, index) => {
      if (pane.id && paneGroup.id) {
        this.updateState(pane.id, {
          groupId: paneGroup.id,
          index
        });
      }
    });
  }

  /**
   * Returns align value of the input paneGroup, or null if pane group doesn't exist in this pane area.
   * @param paneGroup
   * @returns {(Align | undefined) & null}
   */
  getAlign(paneGroup: PaneGroupComponent): Align | null {
    return this.aligns.find(align => this[align].paneGroup === paneGroup) || null;
  }

  private movePane(paneGroup: PaneGroupComponent, pane: PaneComponent, toIndex: number) {
    const fromIndex = paneGroup.panes.indexOf(pane);
    if (fromIndex > -1 && fromIndex !== toIndex) {
      const panes = [].concat(paneGroup.panes); // copy
      panes.splice(toIndex, 0, panes.splice(fromIndex, 1)[0]);
      this.setPanes(paneGroup, panes);
    }
  }

  private addPane(paneGroup: PaneGroupComponent, pane: PaneComponent, toIndex: number) {
    const panes = paneGroup.panes;
    if (toIndex === undefined) {
      toIndex = panes.length;
    }
    if (panes.indexOf(pane) < 0) {
      this.setPanes(paneGroup, panes.slice(0, toIndex).concat(pane).concat(panes.slice(toIndex)));
    }
  }

  private removePane(paneGroup: PaneGroupComponent, pane: PaneComponent) {
    const index = paneGroup.panes.indexOf(pane);
    if (index > -1) {
      this.setPanes(paneGroup, paneGroup.panes.slice(0, index).concat(paneGroup.panes.slice(index + 1)));
    }
  }

  private updateState(paneId: string, updates: Partial<PanePosition>) {
    this.panePositions = Object.assign({}, this.panePositions, {
      [paneId]: Object.assign({}, this.panePositions[paneId] || {}, updates)
    });
    this.panePositionsChange.emit(this.panePositions);
  }

  private syncGroups(): void {
    this.aligns.forEach(align => {
      if (!this.paneGroups.some(paneGroup => this[align].paneGroup === paneGroup)) {
        this.removeSide(align);
      }
    });
    this.paneGroups.forEach(paneGroup => {
      this.addGroup(paneGroup);
    });
    this.syncPanes();

    const hasMissingId = group => !group.id || group.panes.some(pane => !pane.id);
    if (this.stateManager && this.paneGroups.some(hasMissingId)) {
      libLogger.warn(`state managed pane area is used but there is at least one pane or pane group without id.
      things may not work as expected`);
    }
  }

  private syncPanes() {
    const allPanes = this.paneGroups.reduce<PaneComponent[]>((panesSoFar, paneGroup) => {
      return [...panesSoFar, ...paneGroup.panes];
    }, []);
    const allChildPanes = this.paneGroups.reduce<PaneComponent[]>((panesSoFar, paneGroup) => {
      return [...panesSoFar, ...paneGroup.childPanes.toArray()];
    }, []);

    const paneGroupPanes = new Map<PaneGroupComponent, PaneComponent[]>();
    this.paneGroups.forEach(paneGroup => {
      paneGroupPanes.set(paneGroup, paneGroup.panes.filter(pane => allChildPanes.indexOf(pane) > -1));
    });
    this.paneGroups.forEach(paneGroup => {
      // remove stale panes.
      paneGroup.childPanes.forEach((childPane, index) => {
        if (allPanes.indexOf(childPane) < 0) {
          // add the ones that are not yet added.
          const paneHistory = this.panePositions[childPane.id];
          let targetGroup = paneGroup, targetIndex = index;
          if (paneHistory) {
            const previousGroup = this.paneGroups.find(group => group.id === paneHistory.groupId);
            if (previousGroup) {
              targetGroup = previousGroup;
              targetIndex = paneHistory.index;
            }
          }
          const panes = paneGroupPanes.get(targetGroup);
          if (targetIndex < panes.length) {
            panes.splice(targetIndex, 0, childPane);
          } else {
            panes[targetIndex] = childPane;
          }
        }
      });
    });
    this.paneGroups.forEach(paneGroup => {
      paneGroup.setPanes(paneGroupPanes.get(paneGroup).filter(i => i));
    });
  }

  private addGroup(paneGroup: PaneGroupComponent) {
    const side = paneGroup._align;
    const firstAvailableSide = this.aligns.find(align => !this[align].paneGroup);
    const currentSide = this.aligns.find(align => this[align].paneGroup === paneGroup);

    if (currentSide && (currentSide === side || !side)) {
      return;
    }
    if (side) {
      // If there is already a pane group in that side, and an empty side exists
      if (this[side].paneGroup && (currentSide || firstAvailableSide)) {
        // Swap it with currently adding group if it's already placed in a side, or
        // move current pane group at this side to first available side
        this.setupSide(this[side].paneGroup, currentSide || firstAvailableSide);
      }
      // Setup this new pane group at the ordered side
      this.setupSide(paneGroup, side);
    } else if (firstAvailableSide) {
      // if side is not specified, setup pane group in first available side.
      this.setupSide(paneGroup, firstAvailableSide);
    }
  }


  private removeSide(side: Align) {
    if (this[side].subscriptions) {
      this[side].subscriptions.forEach(subscription => subscription.unsubscribe());
    }
    this[side].paneGroup = null;
  }

  private setupSide(paneGroup: PaneGroupComponent, side: Align) {
    this.removeSide(side);
    this[side] = {
      paneGroup: paneGroup,
      subscriptions: [
        paneGroup.align$.subscribe(() => this.syncGroups()),
        paneGroup.childPanes.changes.subscribe(() => this.syncPanes())
      ]
    };
    paneGroup._align = side;
  }
}
