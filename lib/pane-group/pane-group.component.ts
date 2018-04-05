import {
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  QueryList
} from '@angular/core';
import {Align, RelativeAlign, toAlign, toRelativeAlign} from '../utils/rtl-utils';
import {PANES_DEFAULTS, PanesDefaults} from '../panes-config';
import {PaneComponent} from '../pane/pane.component';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';


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
  /**
   * @private
   */
  align$: Observable<Align> = this.alignChangesSubject.asObservable();

  @Input()
  id: string;

  /**
   * Default size (in pixels) to be used for any child pane with an undefined size.
   * If you don't specify a default size, child panes with undefined {@link PaneComponent#size size}
   * will **wrap they content**.
   * @default null
   * @type {number|null}
   */
  @Input() defaultSize: number | null;

  /**
   * Whether clicking on tabs toggles the selected panes or not. If toggleable is false, clicking on currently open
   * pane's tab will do nothing.
   * @type {boolean}
   * @default true
   */
  @Input() toggleable = true;

  /**
   * Whether or not the first non-disabled pane should be opened if no pane is marked initially as opened.
   * @type {boolean}
   * @default true
   */
  @Input() autoOpen = true;

  /**
   * @private
   */
  public _align: Align;

  get align() {
    return this._align;
  }

  /**
   * @private
   */
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

  /**
   * Event emitted when selected pane has changed via pane area UI. It's not emitted when selected pane is changed
   * via inputs or programmatically.
   * @type {EventEmitter<PaneComponent | null>}
   */
  @Output()
  readonly selectedPaneChange = new EventEmitter<PaneComponent | null>();

  private _selectedPane: PaneComponent | null = null;

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
      if (defaults.defaultSize != null) {
        this.defaultSize = defaults.defaultSize;
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
      if (!this.selectedPane && this.autoOpen) {
        const avaialablePanes = this.panes.filter(pane => !pane.disabled);
        if (avaialablePanes.length > 0) {
          this.selectedPane = avaialablePanes[0];
        }
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
