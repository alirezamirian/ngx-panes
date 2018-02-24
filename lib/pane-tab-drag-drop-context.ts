import {Injectable, NgZone, Optional, SkipSelf} from '@angular/core';
import {PaneTabsComponent} from './pane-tabs/pane-tabs.component';
import {DragEvent, DragStartEvent} from './pane-tab/pane-tab.component';
import {PaneGroupComponent} from './pane-group/pane-group.component';
import {Subject} from 'rxjs/Subject';
import {PaneComponent} from './pane/pane.component';
import {Observable} from 'rxjs/Observable';


/**
 * @private
 */
interface DropCandidate {
  tabGroup: PaneTabsComponent;
  index: number;
}

/**
 * @private
 */
export interface Move {
  pane: PaneComponent;
  from: PaneGroupComponent;
  to: PaneGroupComponent;
  toIndex: number;
}

/**
 * @private
 */
@Injectable()
export class PaneTabDragDropContext {

  private tabGroups: PaneTabsComponent[] = [];

  private movesSubject = new Subject<Move>();

  public moves$: Observable<Move> = this.movesSubject.asObservable();

  constructor(@Optional() @SkipSelf() delegate: PaneTabDragDropContext, private ngZone: NgZone) {
    return delegate;
  }

  addTabs(tabGroup: PaneTabsComponent) {
    if (this.tabGroups.indexOf(tabGroup) < 0) {
      this.tabGroups.push(tabGroup);
    }
  }

  removeTabs(tabGroup: PaneTabsComponent) {
    const index = this.tabGroups.indexOf(tabGroup);
    if (index > -1) {
      this.tabGroups.splice(index, 1);
    }
  }

  dragStarted(initiatorTabGroup: PaneTabsComponent, dragStart: DragStartEvent) {
    const tabGroups: PaneTabsComponent[] = [
      initiatorTabGroup,
      ...this.tabGroups.filter(tabGroup => tabGroup !== initiatorTabGroup)
    ].filter((tabGroup: PaneTabsComponent) => tabGroup.paneGroup);

    this.ngZone.runOutsideAngular(() => {
      let dropCandidate: DropCandidate = null;
      this.ngZone.run(() => {
        tabGroups.forEach(tabGroup => {
          tabGroup.handleDragStart(dragStart, initiatorTabGroup.direction !== tabGroup.direction);
        });
      });
      dragStart.drag$.subscribe((dragEvent: DragEvent) => {
        const rect = dragEvent.from;

        dropCandidate = tabGroups.reduce<DropCandidate>((candidate: DropCandidate, tabGroup) => {
          let dropIndex = -1;
          if (!candidate) {
            dropIndex = tabGroup.getDropIndex(dragEvent.to);
            if (dropIndex > -1) {
              candidate = {
                index: dropIndex,
                tabGroup: tabGroup
              };
            }
          }
          tabGroup.showDropAtIndex(dropIndex);
          return candidate;
        }, null);
      }, null, () => {
        this.ngZone.run(() => {
          if (dropCandidate) {
            this.movesSubject.next({
              pane: dragStart.pane,
              from: initiatorTabGroup.paneGroup,
              to: dropCandidate.tabGroup.paneGroup,
              toIndex: dropCandidate.index
            });
          }
          tabGroups.forEach(tabGroup => {
            tabGroup.handleDragFinish();
          });
        });
      });
    });
  }
}
