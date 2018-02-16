import {
  AfterContentInit,
  Component,
  ContentChildren,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList
} from '@angular/core';
import {Align} from '../utils/rtl-utils';
import {PaneGroupComponent} from '../pane-group/pane-group.component';
import {Move, PaneTabDragDropContext} from '../pane-tab-drag-drop-context';
import {PaneComponent} from '../pane/pane.component';
import {Subscription} from 'rxjs/Subscription';
import {PaneAreaStateManager} from '../state-history-manager';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {skip} from 'rxjs/operators';


interface Side {
  paneGroup: PaneGroupComponent;
  subscription?: Subscription;
}

interface PaneGroupHistory {
  align?: Align;
  paneIds: string[];
}

export interface PaneState {
  size: number;
  groupId: string;
  index: number;
}

export interface PaneHistory {
  [key: string]: PaneState;
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
export class PaneAreaComponent implements OnInit, AfterContentInit, OnDestroy {

  private aligns: Align[] = ['left', 'right', 'bottom', 'top'];

  @Input()
  id: string;
  private historySubject: BehaviorSubject<PaneHistory>;

  left: Side = {paneGroup: null};
  right: Side = {paneGroup: null};
  bottom: Side = {paneGroup: null};
  top: Side = {paneGroup: null};

  @ContentChildren(forwardRef(() => PaneGroupComponent))
  paneGroups: QueryList<PaneGroupComponent>;

  constructor(private dragDropContext: PaneTabDragDropContext,
              private historyManager: PaneAreaStateManager) {
  }

  ngOnInit() {
    this.historySubject = new BehaviorSubject<PaneHistory>(this.historyManager.getHistory(this) || {});
    this.historyManager.trackChanges(this, this.historySubject.asObservable().pipe(skip(1)));

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

  ngOnDestroy() {
    this.historySubject.complete();
  }

  movePane(paneGroup: PaneGroupComponent, pane: PaneComponent, toIndex: number) {
    const fromIndex = paneGroup.panes.indexOf(pane);
    if (fromIndex > -1 && fromIndex !== toIndex) {
      const panes = [].concat(paneGroup.panes); // copy
      panes.splice(toIndex, 0, panes.splice(fromIndex, 1)[0]);
      this.setPanes(paneGroup, panes);
    }
  }

  addPane(paneGroup: PaneGroupComponent, pane: PaneComponent, toIndex: number) {
    const panes = paneGroup.panes;
    if (toIndex === undefined) {
      toIndex = panes.length;
    }
    if (panes.indexOf(pane) < 0) {
      this.setPanes(paneGroup, panes.slice(0, toIndex).concat(pane).concat(panes.slice(toIndex)));
    }
  }

  removePane(paneGroup: PaneGroupComponent, pane: PaneComponent) {
    const index = paneGroup.panes.indexOf(pane);
    if (index > -1) {
      this.setPanes(paneGroup, paneGroup.panes.slice(0, index).concat(paneGroup.panes.slice(index + 1)));
    }
  }


  setPanes(paneGroup: PaneGroupComponent, panes: PaneComponent[]) {
    paneGroup.setPanes(panes);
    panes.forEach((pane, index) => {
      if (pane.id && paneGroup.id) {
        this.updateHistory(pane.id, {
          groupId: paneGroup.id,
          index
        });
      }
    });
  }

  ngAfterContentInit(): void {
    this.paneGroups.forEach(paneGroup => console.log('after content init in pane area', paneGroup.childPanes.length));
    this.paneGroups.changes.subscribe(() => this.syncGroups());
    this.syncGroups();
  }

  updateHistory(paneId: string, updates: Partial<PaneState>) {
    this.historySubject.next(Object.assign({}, this.historySubject.getValue(), {
      [paneId]: Object.assign({}, this.historySubject.getValue()[paneId] || {}, updates)
    }));
  }

  syncGroups(): void {
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

  syncPanes() {
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
          const paneHistory = this.historySubject.getValue()[childPane.id];
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

  /**
   * Returns align value of the input paneGroup, or null if pane group doesn't exist in this pane area.
   * @param paneGroup
   * @returns {(Align | undefined) & null}
   */
  getAlign(paneGroup: PaneGroupComponent): Align | null {
    return this.aligns.find(align => this[align].paneGroup === paneGroup) || null;
  }

  addGroup(paneGroup: PaneGroupComponent) {
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
    if (this[side].subscription) {
      this[side].subscription.unsubscribe();
    }
    this[side].paneGroup = null;
  }

  private setupSide(paneGroup: PaneGroupComponent, side: Align) {
    this.removeSide(side);
    this[side] = {
      paneGroup: paneGroup,
      subscription: paneGroup.childPanes.changes.subscribe(() => this.syncPanes())
    };
    paneGroup._align = side;
  }
}
