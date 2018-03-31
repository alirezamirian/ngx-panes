import {
  ChangeDetectorRef,
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
import {PaneComponent} from '../pane/pane.component';

@Component({
  selector: 'pane-view',
  templateUrl: './pane-view.component.html',
  styleUrls: ['./pane-view.component.scss']
})
export class PaneViewComponent implements OnInit, OnChanges {

  @Input() pane: PaneComponent;

  @ViewChild('content', {read: ViewContainerRef})
  private viewContainerRef: ViewContainerRef;

  @Input()
  public align: Align;
  @ViewChild('contentContainer') private _contentContainer: ElementRef;


  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pane) {
      console.log('panes changed for pane view', this.align);
      this.viewContainerRef.clear();
      if (this.pane) {
        setTimeout(() => {
          // This setTimeout seems to be necessary sometimes (e.g. in swapping pane groups). I don't know why exactly
          this.viewContainerRef.createEmbeddedView(this.pane.content);
        });
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
