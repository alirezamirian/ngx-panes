import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {PaneComponent} from '../pane/pane.component';
import {Align, RelativeAlign, toAlign, toRelativeAlign} from './rtl-utils';
import {PaneViewComponent} from '../pane-view.component';

@Component({
  selector: 'ngx-panes',
  templateUrl: './panes.component.html',
  styleUrls: ['./panes.component.scss']
})
export class PanesComponent implements OnInit, AfterContentInit, OnChanges {
  public _selectedPane: PaneComponent = null;
  public _align: Align;
  public _relativeAlign: RelativeAlign;

  @ViewChild('contentContainer') private _contentContainer: ElementRef;

  @ContentChildren(PaneComponent) panes: QueryList<PaneComponent>;

  @ViewChild(PaneViewComponent) paneView: PaneViewComponent;

  @ViewChild('header', {read: ViewContainerRef}) headerHost: ViewContainerRef;

  @Input() defaultWidth: number | null = null;
  @Input() toggleable = true;
  @Input()
  set positionMode(value: RelativeAlign|Align){
    this._align = toAlign(value, this.getDir());
    this._relativeAlign = toRelativeAlign(value, this.getDir());
  }
  get positionMode() {
    return this._align;
  }

  public get selectedPane(): PaneComponent | null {
    return this._selectedPane;
  }

  public isHorizontal(): boolean {
    return this._align === 'left' || this._align === 'right';
  }

  constructor(private $el: ElementRef, private renderer: Renderer2) { }

  ngAfterContentInit(): void {
    this.panesChanged();
    this.panes.changes.subscribe(panes => this.panesChanged());
  }
  ngOnInit() {
    if (!this.positionMode) {
      this.positionMode = 'start';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  public select(pane: PaneComponent) {
    if (this._selectedPane !== pane) {
      this.headerHost.clear();
      if (pane.header) {
        this.headerHost.createEmbeddedView(pane.header.templateRef);
      }
      this._selectedPane = pane;
    }
  }
  public close() {
    this._selectedPane = null;
  }

  get width() {
    if (this._selectedPane === null) {
      return 0;
    }
    return this._selectedPane.width || this.defaultWidth;
  }

  private paneTabClicked(pane) {
    if (this._selectedPane === pane && this.toggleable) {
      this.close();
    } else {
      this.select(pane);
    }
  }

  private panesChanged() {
    const selectedPaneExists = this.panes.some(pane => pane === this.selectedPane);
    if (!selectedPaneExists) {
      this._selectedPane = null;
    }

    // TODO: let user choose whether automatic selection should be done or not and how
    if (!this._selectedPane) {
      this.select(this.panes.last);
    }
  }

  private getDir(): 'rtl'|'ltr' {
    // TODO: revise
    let el = this.$el.nativeElement.parentElement;
    while (el && el.parentElement !== el) {
      if (el.dir || el.style.direction) {
        return el.dir || el.style.direction;
      }
      el = el.parentElement;
    }
    return 'ltr';
  }

  public directResize(size) {
    this._contentContainer.nativeElement.style.width = size + 'px';
  }
}
