import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  QueryList,
  ViewChildren
} from '@angular/core';
import {PaneComponent} from '../pane/pane.component';
import {Align, RelativeAlign} from '../utils/rtl-utils';
import {DragEvent, DragStartEvent, PaneTabComponent} from '../pane-tab/pane-tab.component';
import {PaneGroupService} from '../pane-group/pane-group.service';

@Component({
  selector: 'pane-tabs',
  templateUrl: './pane-tabs.component.html',
  styleUrls: ['./pane-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PaneTabsComponent {

  @Input()
  paneGroup: PaneGroupService;
  @Input()
  direction: 'h' | 'v';
  @Input()
  align: Align;
  @Input()
  relativeAlign: RelativeAlign;

  @ViewChildren(PaneTabComponent, {read: ElementRef})
  private tabElementRefs: QueryList<ElementRef>;

  private dragState: {
    draggingPane: PaneComponent;
    draggingPaneIndex: number;
    panesRect: any | ClientRect;
    placeholderSize: number;
    placeholderIndex: any;
    dropIndexRanges: { from; to: any }[];
    canAnimate: boolean;
  };

  constructor(private changeDetector: ChangeDetectorRef,
              private ngZone: NgZone,
              private elementRef: ElementRef) {
  }

  dragStarted(dragStart: DragStartEvent) {
    this.ngZone.runOutsideAngular(() => {
      let toIndex = -1;
      this.ngZone.run(() => this.handleDragStart(dragStart));
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
        toIndex = this.getDropIndex(draggingRect);
        this.showDropAtIndex(toIndex);
      }, null, () => {
        if (toIndex > -1) {
          this.paneGroup.move(dragStart.pane, toIndex);
          dragStart.pane.open();
        }
        this.ngZone.run(() => this.handleDragFinish());
      });
    });
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

  private handleDragStart(dragStart: DragStartEvent) {
    const draggingPaneIndex = this.paneGroup.snapshot.panes.indexOf(dragStart.pane);

    const direction = this.oppositeDirection();
    const effectiveSize = this.getSize(dragStart.draggingRect, direction);
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
      canAnimate: false,
      draggingPane: dragStart.pane,
      draggingPaneIndex: draggingPaneIndex,
      placeholderIndex: -1,
      panesRect: this.elementRef.nativeElement.getBoundingClientRect(),
      placeholderSize: effectiveSize,
      dropIndexRanges: dropIndexRanges
    };
    setTimeout(() => {
      this.dragState.canAnimate = true;
      this.changeDetector.detectChanges();
    });
    this.changeDetector.detectChanges();
  }

  private getDropIndex(rect: ClientRect) {
    if (this.canDrop(rect)) {
      const start = this.getStart(rect, this.oppositeDirection());
      return this.dragState.dropIndexRanges.findIndex(range => start >= range.from && start < range.to);
    }
    return -1;
  }

  private showDropAtIndex(index) {
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

  private handleDragFinish() {
    this.dragState = null;
    this.changeDetector.detectChanges();
  }

  private canDrop(rect: ClientRect) {
    const panesRect = this.dragState.panesRect;
    // these conditions are exact behaviour of JetBrains IDEs. There are improvement possibilities however.
    const from = this.getStart(panesRect) - this.getSize(rect);
    const to = this.getEnd(panesRect);
    return (this.getEnd(rect) >= from) && this.getStart(rect) <= to;
  }
}
