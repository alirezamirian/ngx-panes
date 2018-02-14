import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import {Align} from '../utils/rtl-utils';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {catchError, filter, first, map, startWith, switchMap, takeUntil} from 'rxjs/operators';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {DOCUMENT} from '@angular/common';
import {PaneComponent} from '../pane/pane.component';
import {empty} from 'rxjs/observable/empty';


/**
 * @private
 */
interface Point {
  x: number;
  y: number;
}

/**
 * @private
 */
export interface DragEvent {
  from: ClientRect;
  to: ClientRect;
  movement: Point;
}

/**
 * @private
 */
export interface DragStartEvent {
  pane: PaneComponent;
  from: ClientRect;
  drag$: Observable<DragEvent>;
}

const DRAG_TRHESHOLD = 7;

@Component({
  selector: 'pane-tab',
  templateUrl: './pane-tab.component.html',
  styleUrls: ['./pane-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaneTabComponent implements OnInit, OnDestroy {

  @Input()
  active: boolean;

  @Input()
  direction: 'h' | 'v';

  @Input()
  align: Align;

  @Input()
  pane: PaneComponent;

  @Output()
  dragStarted = new EventEmitter();

  private subscription: Subscription;
  private dragStart$: Observable<DragStartEvent | {}>;
  private ghost: any;

  constructor(private ngZone: NgZone,
              private elRef: ElementRef,
              private renderer: Renderer2,
              @Inject(DOCUMENT) private document: Document) {
    this.dragStart$ = fromEvent(this.elRef.nativeElement, 'mousedown')
      .pipe(
        // switch each mousedown event to an stream of mouse movements
        switchMap((mouseDown: MouseEvent) => {
          const from = this.elRef.nativeElement.getBoundingClientRect();
            const isDraggedEnough = (mouseMove: MouseEvent) =>
              Math.abs(mouseMove.pageX - mouseDown.pageX) > DRAG_TRHESHOLD ||
              Math.abs(mouseMove.pageY - mouseDown.pageY) > DRAG_TRHESHOLD;
          const toDrag = (mouseMove: MouseEvent): DragEvent => {
            const movement = {x: mouseMove.pageX - mouseDown.pageX, y: mouseMove.pageY - mouseDown.pageY};
            return {
              from: from,
              to: {
                left: from.left + movement.x,
                right: from.right + movement.x,
                width: from.width,
                height: from.height,
                top: from.top + movement.y,
                bottom: from.bottom + movement.y
              },
              movement
            };
          };
            const toDragStart = (mouseMove: MouseEvent) => ({
              pane: this.pane,
              from,
              drag$: fromEvent(this.document, 'mousemove')
                .pipe(
                  startWith(mouseMove),
                  takeUntil(fromEvent(this.document, 'mouseup')),
                  map(toDrag)
                )
            });
            return fromEvent(this.document, 'mousemove').pipe(
              filter(isDraggedEnough),
              takeUntil(fromEvent(this.document, 'mouseup')),
              map<MouseEvent, DragStartEvent>(toDragStart),
              first(),
              catchError(() => empty()),
            );
          }
        ),
      );
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.subscription = this.dragStart$.subscribe((dragStartEvent: DragStartEvent) => {
        console.log('drag start');
        this.ngZone.run(() => {
          this.dragStarted.emit(dragStartEvent);
        });
        if (this.ghost) {
          this.renderer.removeChild(this.document.body, this.ghost);
        }
        this.ghost = this.elRef.nativeElement.cloneNode(true);
        // FIXME: remove when theming issues are resolved
        synchronizeCssStyles(this.elRef.nativeElement, this.ghost, ['background', 'color']);
        const rect = dragStartEvent.from;
        this.renderer.appendChild(this.document.body, this.ghost);
        this.renderer.addClass(this.ghost, 'ghost');
        this.renderer.setStyle(this.ghost, 'width', rect.width + 'px');
        this.renderer.setStyle(this.ghost, 'height', rect.height + 'px');

        dragStartEvent.drag$.subscribe((dragEvent: DragEvent) => {
          this.renderer.setStyle(this.ghost, 'top', (rect.top + dragEvent.movement.y) + 'px');
          this.renderer.setStyle(this.ghost, 'left', (rect.left + dragEvent.movement.x) + 'px');
        }, null, () => {
          if (this.ghost) {
            // doesn't work as expected, so we call ghost.remove() manually
            this.renderer.removeChild(this.document.body, this.ghost);
            this.ghost.remove();
          }
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

function synchronizeCssStyles(src, destination, styleKeys = ['cssText'], deep = true) {

  // if deep = true, then we assume the src dom structure and destination dom structure
  // are identical (ie: cloneNode was used)

  // window.getComputedStyle vs document.defaultView.getComputedStyle
  // @TBD: also check for compatibility on IE/Edge
  styleKeys.forEach(key => {
    destination.style[key] = document.defaultView.getComputedStyle(src, '')[key];
  });

  if (deep) {
    const vSrcElements = src.getElementsByTagName('*');
    const vDstElements = destination.getElementsByTagName('*');

    for (let i = vSrcElements.length; i--;) {
      const vSrcElement = vSrcElements[i];
      const vDstElement = vDstElements[i];
      styleKeys.forEach(key => {
        vDstElement.style[key] = document.defaultView.getComputedStyle(vSrcElement, '')[key];
      });
    }
  }
}
