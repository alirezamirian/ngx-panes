import {
  Component,
  ContentChild,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {PaneHeaderComponent} from '../pane-header/pane-header.component';
import {CoerceBoolean} from '../utils/decorators';
import {NGX_PANES_DEFAULTS, NgxPanesDefaults} from '../panes-config';
import {PaneGroupComponent} from '../pane-group/pane-group.component';
import {PaneTitleDirective} from './pane-title.directive';
import {PaneContentDirective} from './pane-content.directive';


/**
 * Pane components, are used inside {@link PaneGroupComponent ngx-pane-group}. Each pane should have a
 * {@link PaneComponent#title title} which is shown
 * in its tab. By default, the title is used for **pane header** also.
 * Pane header is a thin bar on top of the selected pane which shows a label and also will contain
 * some default ui controls for the pane in future versions.
 *
 * #### Custom pane header
 * You can specify custom header via {@link PaneHeaderComponent ngx-pane-header}.
 *
 * #### lazy loading
 * Content of the pane can be instantiated whenever pane is opened by using
 * {@link PaneContentDirective ngxPaneContent directive}
 * @usage
 * <ngx-pane-area>
 *   <ngx-pane-group>
 *     <!-- Simple pane with a title -->
 *      <ngx-pane title="project">...</ngx-pane>
 *
 *     <!-- Different title and header. Header is used in top of the selected pane, title is used inside pane's tab -->
 *      <ngx-pane title="structure">
 *        <ngx-pane-header>custom header</ngx-pane-header>
 *        ...
 *      </ngx-pane>
 *      <!-- Lazy loaded content -->
 *      <ngx-pane title="issues">
 *        <div *ngxPaneContent>lazy loaded content</div>
 *      </ngx-pane>
 *   </ngx-pane-group>
 * </ngx-pane-area>
 **/
@Component({
  selector: 'ngx-pane',
  templateUrl: './pane.component.html',
  styleUrls: ['./pane.component.scss']
})
export class PaneComponent implements OnInit {

  /**
   * Title of the pane to be shown in pane's tab.
   * It will also appear in pane header in the absence of `{@link PaneHeaderComponent ngx-pane-header}`.
   * Use {@link PaneTitleDirective ngxPaneTitle directive} if you need more control over pane title.
   */
  @Input() title: string;
  /**
   * Event emitted when pane size is changed via UI. It's not emitted when size is changed via inputs
   * or programmatically.
   * @type {EventEmitter<any>}
   */
  @Output()
  sizeChange = new EventEmitter();

  /**
   * Whether pane is disabled.
   */
  @Input()
  @CoerceBoolean
  disabled: boolean;

  /**
   * @private
   */
  @ViewChild('content', {read: TemplateRef}) private implicitContent: TemplateRef<any>;

  @ContentChild(PaneContentDirective, {read: TemplateRef}) private explicitContent: TemplateRef<any>;

  get content() {
    return this.explicitContent || this.implicitContent;
  }

  private _size: number;

  /**
   * @private
   * @returns {number | null}
   */
  get size(): number | null {
    return this._size || this.paneGroup.defaultSize;
  }

  /**
   * Whether user can resize pane or not.
   */
  @Input() resizable = true;
  /**
   * Unique identifier of the pane.
   */
  @Input() id: string;

  @ContentChild(PaneHeaderComponent) header: PaneHeaderComponent;

  @ContentChild(PaneTitleDirective) titleTemplate: PaneTitleDirective;

  /**
   * Size of the pane. More precisely, **width** for **horizontally** aligned and **height** for **vertically**
   * aligned panes.
   * If unset, `defaultSize` of the host `ngx-pane-group` will be used. If both are undefined, the content of the
   * pane will determine its size. Resizing pane (if enabled) changes the pane's size.
   */
  @Input() set size(w: number | null) {
    this._size = w;
  };

  /**
   * @private
   * Whether this pane is currently opened or not.
   * @returns {boolean}
   */
  get opened() {
    return this.paneGroup.selectedPane === this;
  }

  /**
   * Whether this pane should be opened or not. Usually used for initialization.
   * Whenever it changes to `true`/`false`, this pane is opened/closed.
   */
  @Input()
  @CoerceBoolean
  set opened(value: boolean) {
    if (value) {
      this.open();
    } else {
      if (this.opened) {
        this.close();
      }
    }
  };

  /**
   * @private
   */
  maxSize: number;

  constructor(public paneGroup: PaneGroupComponent,
              @Optional() @Inject(NGX_PANES_DEFAULTS) defaults: NgxPanesDefaults) {
    if (defaults) {
      if (defaults.resizable != null) {
        this.resizable = defaults.resizable;
      }
    }
    if (this.opened) {
      this.paneGroup.open(this);
    }

  }

  ngOnInit() {

  }


  /**
   * Opens this pane. Does nothing if already opened.
   */
  open() {
    this.paneGroup.open(this);
  }

  /**
   * Closes this pane. Does nothing if it's not opened.
   */
  close() {
    if (this.opened) {
      this.paneGroup.close();
    }
  }
}
