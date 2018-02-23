import {
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  Inject,
  Input,
  OnInit,
  Optional,
  QueryList
} from '@angular/core';
import {Align, RelativeAlign, toAlign, toRelativeAlign} from '../utils/rtl-utils';
import {PANES_DEFAULTS, PanesDefaults} from '../panes-config';
import {PaneComponent} from '../pane/pane.component';
import {Subject} from 'rxjs/Subject';


/**
 * Pane groups are used inside {@link PaneAreaComponent ngx-pane-area}.
 * Each group of panes is align in of the the four
 * possible sides of the pane-area, which is determined by
 * {@link PaneGroupComponent#align align} input. if align is not specified,
 * first unused align with the following order will be used:
 * - `start` (`left` in ltr, `right` in rtl)
 * - `end` (`right` in ltr, `left` in rtl)
 * - `bottom`
 * - `top`
 *
 * See also [Alignment demo](/demos/align).
 * @usage
 * <ngx-pane-area>
 *   <ngx-pane-group>
 *      <!-- ngx-pane components -->
 *   </ngx-pane-group>
 * </ngx-pane-area>
 */
@Component({
  selector: 'ngx-pane-group',
  template: '',
})
export class PaneGroupComponent implements OnInit {

  private _relativeAlign: RelativeAlign;
  private initialized: boolean;

  private alignChangesSubject = new Subject<Align>();
  align$ = this.alignChangesSubject.asObservable();

  @Input()
  id: string;

  /**
   * Default width (in pixels) to be used for any child pane with an undefined width.
   * If you don't specify a default width, child panes will **wrap they content**.
   * @default null
   * @type {number|null}
   */
  @Input() defaultWidth: number | null;

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

  public _align: Align;

  get align() {
    return this._align;
  }

  @ContentChildren(forwardRef(() => PaneComponent))
  childPanes: QueryList<PaneComponent>;
  public panes: PaneComponent[] = [];

  // noinspection JSAnnotator
  /**
   * Position of the pane group inside {@link PaneAreaComponent pane area}.
   * It can be a {@link RelativeAlign} or an {@link Align}.
   * @param value
   * @default 'start'
   */
  @Input()
  set align(value: RelativeAlign | Align) {
    this._align = toAlign(value, this.getDir());
    this._relativeAlign = toRelativeAlign(value, this.getDir());
    this.alignChangesSubject.next(this._align);
  }

  private _selectedPane: PaneComponent | null;

  /**
   * returns currently selected pane
   * @returns {PaneComponent}
   */
  public get selectedPane(): PaneComponent | null {
    return this._selectedPane;
  }

  public set selectedPane(pane: PaneComponent | null) {
    this._selectedPane = pane;
  }

  constructor(private $el: ElementRef,
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


  ngOnInit() {
  }


  /**
   * @private
   */
  public setPanes(panes: PaneComponent[]) {
    this.panes = panes;
    if (panes.indexOf(this.selectedPane) < 0) {
      this.selectedPane = null;
    }
    if (!this.initialized) {
      this.selectedPane = this.panes.find(pane => pane._openned) || null;
      if (!this.selectedPane && this.autoOpen && this.panes.length > 0) {
        this.selectedPane = this.panes[0];
      }
    }
    panes.forEach(pane => pane.paneGroup = this);
    this.initialized = true;
  }

  /**
   * Closes currently selected pane. Does nothing if already closed.
   */
  public close(): void {
    this.selectedPane = null;
  }

  public open(pane: PaneComponent) {
    this.selectedPane = pane;
  }

  public toggle(pane: PaneComponent) {
    if (this.selectedPane === pane && this.toggleable) {
      this.close();
    } else if (pane) {
      this.open(pane);
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
