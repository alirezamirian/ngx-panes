import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Align} from '../utils/rtl-utils';

@Component({
  selector: 'pane-view',
  templateUrl: './pane-view.component.html',
  styleUrls: ['./pane-view.component.scss']
})
export class PaneViewComponent implements OnInit, OnChanges {

  @Input() pane;

  @ViewChild('content', {read: ViewContainerRef})
  private viewContainerRef: ViewContainerRef;

  @ViewChild('header', {read: ViewContainerRef})
  private headerContainerRef: ViewContainerRef;

  @Input()
  public align: Align;
  @ViewChild('contentContainer') private _contentContainer: ElementRef;


  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pane) {
      this.viewContainerRef.clear();
      if (this.pane) {
        this.viewContainerRef.createEmbeddedView(this.pane.content);
        this.headerContainerRef.clear();
        if (this.pane.header) {
          this.headerContainerRef.createEmbeddedView(this.pane.header.templateRef);
        }
      }
    }
  }

  public directResize(size) {
    if (this.isHorizontal()) {
      this._contentContainer.nativeElement.style.width = size + 'px';
    } else {
      this._contentContainer.nativeElement.style.height = size + 'px';

    }
  }

  public getSize() {
    if (this.isHorizontal()) {
      return this._contentContainer.nativeElement.offsetWidth;
    } else {
      return this._contentContainer.nativeElement.offsetHeight;
    }
  }

  public isHorizontal(): boolean {
    return this.align === 'left' || this.align === 'right';
  }

}
