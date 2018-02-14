import {Injectable, NgZone, Optional, SkipSelf} from '@angular/core';
import {PaneTabsComponent} from './pane-tabs/pane-tabs.component';
import {DragEvent, DragStartEvent} from './pane-tab/pane-tab.component';


interface DropCandidate {
  tabGroup: PaneTabsComponent;
  index: number;
}

@Injectable()
export class PaneTabDragDropContext {

  private tabGroups: PaneTabsComponent[] = [];

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
          tabGroup.handleDragStart(dragStart);
        });
      });
      dragStart.drag$.subscribe((dragEvent: DragEvent) => {
        const rect = dragEvent.draggingRect;
        const draggingRect: ClientRect = {
          left: rect.left + dragEvent.movement.x,
          right: rect.right + dragEvent.movement.x,
          width: rect.width,
          height: rect.height,
          top: rect.top + dragEvent.movement.y,
          bottom: rect.bottom + dragEvent.movement.y
        };

        dropCandidate = tabGroups.reduce<DropCandidate>((candidate: DropCandidate, tabGroup) => {
          let dropIndex = -1;
          if (!candidate) {
            dropIndex = tabGroup.getDropIndex(draggingRect);
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
            if (dropCandidate.tabGroup.paneGroup === initiatorTabGroup.paneGroup) {
              initiatorTabGroup.paneGroup.move(dragStart.pane, dropCandidate.index);
            } else {
              dropCandidate.tabGroup.paneGroup.add(dragStart.pane, dropCandidate.index);
              initiatorTabGroup.paneGroup.remove(dragStart.pane);
            }
            dragStart.pane.open();
          }
          tabGroups.forEach(tabGroup => {
            tabGroup.handleDragFinish();
          });
        });
      });
    });
  }
}
