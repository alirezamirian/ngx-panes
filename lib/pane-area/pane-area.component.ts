import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList} from '@angular/core';
import {Align} from '../utils/rtl-utils';
import {PaneGroupComponent} from '../pane-group/pane-group.component';
import {Move, PaneTabDragDropContext} from '../pane-tab-drag-drop-context';
import {PaneComponent} from '../pane/pane.component';
import {Subscription} from 'rxjs/Subscription';
import {PaneAreaStateManager} from '../pane-area-state-manager';


interface Side {
  paneGroup: PaneGroupComponent;
  subscriptions?: Subscription[];
}

/**
 * Represents state of {@link PaneComponent pane} position inside a {@link PaneAreaComponent paneArea}.
 * Used in {@link PaneAreaState}.
 */
export interface PaneState {
  /**
   * Id of the {@link PaneGroupComponent paneGroup} this pane should be placed into.
   */
  groupId: string;
  /**
   * Position (index) of the pane inside the parent {@link PaneGroupComponent paneGroup}
   */
  index: number;
}

/**
 * A dictionary from {@link PaneComponent pane} component ids to {@link PaneState} objects.
 * Used to represent state of panes inside {@link PaneAreaComponent pane area}, for overriding default
 * positioning and ordering based on template.
 */
export interface PaneAreaState {
  [id: string]: PaneState;
}

/**
 * Defines an area consisted of a centered main content surrounded by
 * up to 4 side pane groups (aka tool windows).
 *
 * Children of ngx-pane-area except for {@link PaneGroupComponent ngx-pane-group}s are
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
   * to store state of panes inside pane area.
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

  left: Side = {paneGroup: null};
  right: Side = {paneGroup: null};
  bottom: Side = {paneGroup: null};
  top: Side = {paneGroup: null};
  /**
   * @private
   */
  @ContentChildren(PaneGroupComponent)
  paneGroups: QueryList<PaneGroupComponent>;
  private aligns: Align[] = ['left', 'right', 'bottom', 'top'];

  @Output()
  stateChange: EventEmitter<PaneAreaState> = new EventEmitter<PaneAreaState>();

  /**
   * Position and order of panes inside pane groups, to override default arrangement based on template.
   * While it's possible to pass it via inputs, it's normally not the case, and {@link PaneAreaStateManager}
   * will handle it.
   */
  @Input()
  state: PaneAreaState;

  constructor(private dragDropContext: PaneTabDragDropContext,
              private stateManager: PaneAreaStateManager) {
  }

  ngAfterContentInit(): void {
    this.stateManager.trackChanges(this, this.stateChange);
    Promise.resolve(this.state || this.stateManager.getSavedState(this)).then(state => {
      this.state = state || {};

      // TODO: add support for async state initialization and postpone initialization bellow until state got initialized
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

  private updateState(paneId: string, updates: Partial<PaneState>) {
    this.state = Object.assign({}, this.state, {
      [paneId]: Object.assign({}, this.state[paneId] || {}, updates)
    });
    this.stateChange.emit(this.state);
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
          const paneHistory = this.state[childPane.id];
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
