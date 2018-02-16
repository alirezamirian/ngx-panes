import {AfterContentInit, Component, ContentChildren, forwardRef, OnInit, QueryList} from '@angular/core';
import {Align} from '../utils/rtl-utils';
import {PaneGroupComponent} from '../pane-group/pane-group.component';
import {Move, PaneTabDragDropContext} from '../pane-tab-drag-drop-context';
import {PaneComponent} from '../pane/pane.component';
import {Subscription} from 'rxjs/Subscription';
import {StateHistoryManager} from '../state-history-manager';


interface Side {
  paneGroup: PaneGroupComponent;
  subscription?: Subscription;
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
export class PaneAreaComponent implements OnInit, AfterContentInit {

  private aligns: Align[] = ['left', 'right', 'bottom', 'top'];

  left: Side = {paneGroup: null};
  right: Side = {paneGroup: null};
  bottom: Side = {paneGroup: null};
  top: Side = {paneGroup: null};

  @ContentChildren(forwardRef(() => PaneGroupComponent))
  paneGroups: QueryList<PaneGroupComponent>;

  constructor(private dragDropContext: PaneTabDragDropContext,
              private history: StateHistoryManager) {
  }

  ngOnInit() {
    this.dragDropContext.moves$.subscribe((move: Move) => {
      if (move.from === move.to) {
        this.movePane(move.from, move.pane, move.toIndex);
      } else {
        this.addPane(move.to, move.pane, move.toIndex);
        this.removePane(move.from, move.pane);
      }
    });
  }

  movePane(paneGroup: PaneGroupComponent, pane: PaneComponent, toIndex: number) {
    const fromIndex = paneGroup.panes.indexOf(pane);
    if (fromIndex > -1 && fromIndex !== toIndex) {
      const panes = [].concat(paneGroup.panes); // copy
      panes.splice(toIndex, 0, panes.splice(fromIndex, 1)[0]);
      paneGroup.setPanes(panes);
    }
  }

  addPane(paneGroup: PaneGroupComponent, pane: PaneComponent, toIndex: number) {
    const panes = paneGroup.panes;
    if (toIndex === undefined) {
      toIndex = panes.length;
    }
    if (panes.indexOf(pane) < 0) {
      paneGroup.setPanes(panes.slice(0, toIndex).concat(pane).concat(panes.slice(toIndex)));
    }
  }

  removePane(paneGroup: PaneGroupComponent, pane: PaneComponent) {
    const index = paneGroup.panes.indexOf(pane);
    if (index > -1) {
      paneGroup.setPanes(paneGroup.panes.slice(0, index).concat(paneGroup.panes.slice(index + 1)));
    }
  }

  ngAfterContentInit(): void {
    this.paneGroups.forEach(paneGroup => console.log('after content init in pane area', paneGroup.childPanes.length));
    this.paneGroups.changes.subscribe(() => this.syncGroups());
    this.syncGroups();
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
    const areEqual = (pane1: PaneComponent, pane2: PaneComponent) =>
      pane1 === pane2 || pane1.id != null && pane1.id === pane2.id;

    const allPanes = this.paneGroups.reduce<PaneComponent[]>((panesSoFar, paneGroup) => {
      return [...panesSoFar, ...paneGroup.panes];
    }, []);
    const allChildPanes = this.paneGroups.reduce<PaneComponent[]>((panesSoFar, paneGroup) => {
      return [...panesSoFar, ...paneGroup.childPanes.toArray()];
    }, []);

    this.paneGroups.forEach(paneGroup => {
      // remove removed panes
      let panes = paneGroup.panes.filter(pane => allChildPanes.some(aPane => areEqual(pane, aPane)));
      paneGroup.childPanes.forEach((childPane, index) => {
        if (!allPanes.some(aPane => areEqual(childPane, aPane))) {
          // add newly added panes
          panes = panes.slice(0, index).concat(childPane).concat(panes.slice(index));
        }
      });
      paneGroup.setPanes(panes);
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
