import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {PaneComponent} from '../pane/pane.component';
import {Align, RelativeAlign, toAlign, toRelativeAlign} from './rtl-utils';
import {PaneViewComponent} from '../pane-view.component';
import {PANES_DEFAULTS, PanesDefaults} from '../panes-config';

/**
 * Renders a list of panes, navigatable with side tabs.
 *
 * @usage
 * <ngx-panes>
 *     <ngx-pane title="First Pane">...</ngx-pane>
 *     <ngx-pane title="Second Pane">...</ngx-pane>
 * </ngx-panes>
 *
 * @example
 * <ngx-panes>
 *     <ngx-pane></ngx-pane>
 * </ngx-panes>
 */
@Component({
  selector: 'ngx-panes',
  templateUrl: './panes.component.html',
  styleUrls: ['./panes.component.scss']
})
export class PanesComponent implements OnInit, AfterContentInit, OnChanges {
  private _selectedPane: PaneComponent = null;
  public _align: Align;
  public _relativeAlign: RelativeAlign;

  @ViewChild('contentContainer') private _contentContainer: ElementRef;

  @ContentChildren(PaneComponent) panes: QueryList<PaneComponent>;

  @ViewChild(PaneViewComponent) paneView: PaneViewComponent;

  @ViewChild('header', {read: ViewContainerRef}) headerHost: ViewContainerRef;

  /**
   * Default width (in pixels) to be used for any child pane with an undefined width.
   * If you don't specify a default width, child panes will **wrap they content**.
   * @default null
   * @type {number|null}
   */
  @Input() defaultWidth: number | null = null;
  /**
   * Whether clicking on tabs toggles the selected panes or not. If toggleable is false, clicking on currently open
   * pane's tab will do nothing.
   * @type {boolean}
   * @default true
   */
  @Input() toggleable = true;

  /**
   * Whether or not the last pane should be opened if no pane is marked initially as opened.
   * @type {boolean}
   * @default true
   */
  @Input() autoOpen = true;

  maxSize: number;

  // noinspection JSAnnotator
  /**
   * Direction which the ngx-panes is aligned. It can be a {@link RelativeAlign} or Align.
   * @param value
   * @default 'start'
   */
  @Input()
  set align(value: RelativeAlign | Align) {
    this._align = toAlign(value, this.getDir());
    this._relativeAlign = toRelativeAlign(value, this.getDir());
  }

  get align() {
    return this._align;
  }

  /**
   * returns currently selected pane
   * @returns {PaneComponent}
   */
  public get selectedPane(): PaneComponent | null {
    return this._selectedPane;
  }

  public isHorizontal(): boolean {
    return this._align === 'left' || this._align === 'right';
  }

  constructor(private $el: ElementRef, @Optional() @Inject(PANES_DEFAULTS) defaults: PanesDefaults) {
    if (defaults) {
      if (defaults.autoOpen != null) {
        this.autoOpen = defaults.autoOpen;
      }
      if (defaults.defaultWidth != null) {
        this.defaultWidth = defaults.defaultWidth;
      }
      if (defaults.toggleable != null) {
        this.toggleable = defaults.toggleable;
      }
    }
  }

  ngAfterContentInit(): void {
    this.panesChanged();
    this.panes.changes.subscribe(panes => this.panesChanged());
  }

  ngOnInit() {
    if (!this.align) {
      this.align = 'start';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  /**
   * selects a child pane.
   * @param pane child `PaneComponent` instance to select
   */
  public open(pane: PaneComponent) {
    if (this._selectedPane !== pane) {
      this.headerHost.clear();
      if (pane.header) {
        this.headerHost.createEmbeddedView(pane.header.templateRef);
      }
      this._selectedPane = pane;
    }
  }

  /**
   * Closes currently selected pane. Does nothing if already closed.
   */
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
      this.open(pane);
    }
  }

  private panesChanged() {
    const selectedPaneExists = this.panes.some(pane => pane === this.selectedPane);
    if (!selectedPaneExists) {
      this._selectedPane = null;
    }

    if (!this._selectedPane && this.autoOpen) {
      this.open(this.panes.last);
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

  private getDir(): 'rtl' | 'ltr' {
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
}
