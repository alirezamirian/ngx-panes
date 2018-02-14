import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  QueryList,
  ViewChildren
} from '@angular/core';
import {PaneComponent} from '../pane/pane.component';
import {Align, RelativeAlign} from '../utils/rtl-utils';
import {DragStartEvent, PaneTabComponent} from '../pane-tab/pane-tab.component';
import {PaneGroupService} from '../pane-group/pane-group.service';
import {PaneTabDragDropContext} from '../pane-tab-drag-drop-context';

interface Range {
  from;
  to: any;
}

interface DragState {
  draggingPane: PaneComponent;
  draggingPaneIndex: number;
  panesRect: any | ClientRect;
  willRotate: boolean;
  placeholderSize: number;
  placeholderIndex: any;
  /**
   * Each element in this list represents an interval (in x or y direction depending on direction
   * panesComponent) for corresponding child tab, which specifies drop zone for that index.
   */
  dropIndexRanges: Range[];

  /**
   * Used for disabling initial unwanted animation
   */
  started: boolean
}

@Component({
  selector: 'pane-tabs',
  templateUrl: './pane-tabs.component.html',
  styleUrls: ['./pane-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    PaneTabDragDropContext
  ]
})
export class PaneTabsComponent implements OnDestroy {

  @Input()
  paneGroup: PaneGroupService;
  @Input()
  direction: 'h' | 'v';
  @Input()
  align: Align;
  @Input()
  relativeAlign: RelativeAlign;

  @HostBinding('class.dragging')
  get canAnimate(): boolean {
    return this.dragState && this.dragState.started;
  };

  @ViewChildren(PaneTabComponent, {read: ElementRef})
  private tabElementRefs: QueryList<ElementRef>;

  private dragState: DragState | null;

  constructor(private changeDetector: ChangeDetectorRef,
              private ngZone: NgZone,
              private dragDropContext: PaneTabDragDropContext,
              private elementRef: ElementRef) {
    this.dragDropContext.addTabs(this);
  }

  ngOnDestroy(): void {
    this.dragDropContext.removeTabs(this);
  }

  dragStarted(dragStart: DragStartEvent) {
    this.dragDropContext.dragStarted(this, dragStart);
  }

  getSize(rect: ClientRect, direction = this.direction) {
    if (direction === 'h') {
      return rect.width;
    }
    return rect.height;
  }

  getStart(rect: ClientRect, direction = this.direction) {
    if (direction === 'h') {
      return rect.left;
    }
    return rect.top;
  }

  getEnd(rect: ClientRect, direction = this.direction) {
    if (direction === 'h') {
      return rect.right;
    }
    return rect.bottom;
  }

  oppositeDirection() {
    return this.direction === 'h' ? 'v' : 'h';
  }

  private getCenter(rect: ClientRect, direction = this.direction) {
    return this.getStart(rect, direction) + this.getSize(rect, direction) / 2;
  }

  handleDragStart(dragStart: DragStartEvent, willRotate: boolean) {
    const draggingPaneIndex = this.paneGroup.snapshot.panes.indexOf(dragStart.pane);

    const direction = this.oppositeDirection();
    const effectiveSize = this.getSize(dragStart.from, willRotate ? this.direction : direction);
    const dropIndexRanges = this.tabElementRefs
      .filter((tabElementRef, index) => index !== draggingPaneIndex)
      .map(elRef => elRef.nativeElement)
      // map to rects
      .map(tabElem => tabElem.getBoundingClientRect())
      // map to center of each rect
      .map((rect, index) =>
        this.getCenter(rect, direction) - (draggingPaneIndex === -1 || index < draggingPaneIndex ? 0 : effectiveSize))
      // map to acceptable range for that index
      .map((center, index, centers) => {
        return {
          from: index > 0 ? centers[index - 1] : -Infinity,
          to: center
        };
      });
    dropIndexRanges.push({
      from: dropIndexRanges.length > 0 ? dropIndexRanges[dropIndexRanges.length - 1].from : -Infinity,
      to: Infinity
    });
    this.dragState = {
      started: false,
      draggingPane: dragStart.pane,
      willRotate,
      draggingPaneIndex: draggingPaneIndex,
      placeholderIndex: -1,
      panesRect: this.elementRef.nativeElement.getBoundingClientRect(),
      placeholderSize: effectiveSize,
      dropIndexRanges: dropIndexRanges
    };
    setTimeout(() => {
      this.dragState.started = true;
      this.changeDetector.detectChanges();
    });
    this.changeDetector.detectChanges();
  }

  getDropIndex(rect: ClientRect) {
    if (this.canDrop(rect)) {
      const start = this.getStart(rect, this.oppositeDirection());
      return this.dragState.dropIndexRanges.findIndex(range => start >= range.from && start < range.to);
    }
    return -1;
  }

  showDropAtIndex(index) {
    let placeholderIndex = index;
    if (index > -1 && this.dragState.draggingPaneIndex > -1 && index >= this.dragState.draggingPaneIndex) {
      placeholderIndex++;
    }
    if (placeholderIndex !== this.dragState.placeholderIndex) {
      this.dragState.placeholderIndex = placeholderIndex;
      this.ngZone.run(() => {
        this.changeDetector.detectChanges();
      });
    }
  }

  handleDragFinish() {
    this.dragState = null;
    this.changeDetector.detectChanges();
  }

  private canDrop(rect: ClientRect) {
    // these conditions are exact behaviour of JetBrains IDEs. There are rooms for improvement however.
    const size = this.getSize(rect, this.dragState.willRotate ? this.oppositeDirection() : this.direction);
    const from = this.getStart(this.dragState.panesRect) - size;
    const to = this.getEnd(this.dragState.panesRect);
    return (this.getEnd(rect) >= from) && this.getStart(rect) <= to;
  }
}
