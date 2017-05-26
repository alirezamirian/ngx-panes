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

@Component({
  selector: 'ngx-panes',
  templateUrl: './panes.component.html',
  styleUrls: ['./panes.component.scss']
})
export class PanesComponent implements OnInit, AfterContentInit, OnChanges {
  private _selectedPane: PaneComponent = null;
  private _align: Align;
  private _relativeAlign: RelativeAlign;

  @ViewChild('contentContainer') private _contentContainer: ElementRef;

  @ContentChildren(PaneComponent) panes: QueryList<PaneComponent>;

  @ViewChild('content', {read: ViewContainerRef}) contentHost: ViewContainerRef;
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

  get selectedPane(): PaneComponent | null {
    return this._selectedPane;
  }

  public isHorizontal(): boolean {
    return this._align === 'left' || this._align === 'right';
  }

  constructor(private $el: ElementRef, private renderer: Renderer2) { }

  ngAfterContentInit(): void {
    this.panesChanged();
    this.panes.changes.subscribe(tabs => this.panesChanged());
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
      this.contentHost.clear();
      this.contentHost.createEmbeddedView(pane.content);

      this.headerHost.clear();
      if (pane.header) {
        this.headerHost.createEmbeddedView(pane.header.templateRef);
      }
      this._selectedPane = pane;
    }
  }
  public close() {
    this.contentHost.clear();
    this._selectedPane = null;
  }

  get width() {
    if (this._selectedPane === null) {
      return 0;
    }
    return this._selectedPane.width || this.defaultWidth;
  }

  public getEffectivePaneWidth(): number {
    return this.contentHost.element.nativeElement.parentElement.offsetWidth;
  }
  private paneTabClicked(pane) {
    if (this._selectedPane === pane && this.toggleable) {
      this.close();
    } else {
      this.select(pane);
    }
  }

  private panesChanged() {
    if (!this._selectedPane) {
      this.select(this.panes.first);
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
