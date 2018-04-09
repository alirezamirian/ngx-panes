import {AfterViewInit, Directive, ElementRef, Inject, Input, NgZone, OnDestroy, Renderer2} from '@angular/core';
import {CoerceBoolean} from '../utils/decorators';
import {DOCUMENT} from '@angular/common';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {debounceTime, merge} from 'rxjs/operators';
import {Subscription} from 'rxjs/Subscription';

/**
 * Makes `pane-area` fill entire remaining window height. The more preferred way to achieve this is with pure
 * css (with flexbox or other approaches). However css solution might not be available in some cases or it may
 * require a lot of `height: 100%` styles on all descendants back to body.
 *
 * @usage
 * <ngx-pane-area ngxFullHeight>
 *  ...
 * </ngx-pane-area>
 *
 * @experimental
 */
@Directive({
  selector: 'ngx-pane-area[ngxFullHeight]'
})
export class FullHeightDirective implements AfterViewInit, OnDestroy {

  /**
   * Whether directive is active or not.
   * @type {boolean}
   */
  @Input('ngxFullHeight')
  @CoerceBoolean
  enabled = true;
  // low priority TODO: react to changes. setup and tear down event handling when active is false.

  /**
   * Offset to consider when sizing pane-area. The offset is subtracted from the calculated height
   * @type {number}
   */
  @Input('ngxFullHeightOffset')
  offsetHeight = 1;

  private subscription: Subscription;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2,
              private ngZone: NgZone,
              @Inject(DOCUMENT) private document: Document) {
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.update();
      if (this.document && typeof window !== 'undefined') {
        const resize$ = fromEvent(window, 'resize');
        const transitionEnd$ = fromEvent(this.document, 'transitionend');
        this.subscription = resize$.pipe(
          merge(transitionEnd$),
          debounceTime(100)
        ).subscribe(() => this.update());
      }
    });

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private update() {
    if (this.enabled) {
      const el: HTMLElement = this.elementRef.nativeElement;
      // const offsetParent = <HTMLElement> el.offsetParent;
      let height;
      if (typeof window !== 'undefined') {
        const top = el.getBoundingClientRect().top;
        if (top >= 0) {
          height = window.innerHeight - top;
        }
      }
      // if (offsetParent && el.offsetTop !== null) {
      //   height = offsetParent.offsetHeight - el.offsetTop;
      // }
      if (height) {
        height -= this.offsetHeight;
      }
      if (height > 50) {
        this.renderer.setStyle(el, 'height', `${height}px`);
      }
    }
  }

}
