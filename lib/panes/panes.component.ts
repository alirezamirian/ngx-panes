import {
  AfterContentInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {PaneComponent} from '../pane/pane.component';
import {Align, RelativeAlign, toAlign, toRelativeAlign} from '../utils/rtl-utils';
import {PaneViewComponent} from '../pane-view/pane-view.component';
import {PANES_DEFAULTS, PanesDefaults} from '../panes-config';
import {PaneGroupService} from '../pane-group/pane-group.service';

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
  public _relativeAlign: RelativeAlign;
  @ViewChild(PaneViewComponent) paneView: PaneViewComponent;
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
  private panes: PaneComponent[];
  private _selectedPane: PaneComponent = null;

  public _align: Align;

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

  get width() {
    if (this._selectedPane === null) {
      return 0;
    }
    return this._selectedPane.width || this.defaultWidth;
  }

  constructor(private $el: ElementRef,
              private paneGroup: PaneGroupService,
              @Optional() @Inject(PANES_DEFAULTS) defaults: PanesDefaults) {
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

  public isHorizontal(): boolean {
    return this._align === 'left' || this._align === 'right';
  }

  ngAfterContentInit(): void {
    this.paneGroup.selectedPane$.subscribe((selectedPane: PaneComponent) => {
      this._selectedPane = selectedPane;
    });

    this.paneGroup.panes$.subscribe((panes: PaneComponent[]) => {
      this.panes = panes;
      if (!this._selectedPane && this.autoOpen && panes.length > 0) {
        panes[panes.length - 1].open();
      }
    });

  }

  ngOnInit() {
    if (!this.align) {
      this.align = 'start';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  /**
   * Closes currently selected pane. Does nothing if already closed.
   */
  public close() {
    this.paneGroup.close();
  }

  private paneTabClicked(pane: PaneComponent) {
    if (this._selectedPane === pane && this.toggleable) {
      this.close();
    } else {
      pane.open();
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
