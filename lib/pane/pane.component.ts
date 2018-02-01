import {Component, ContentChild, forwardRef, Inject, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PaneHeaderComponent} from '../pane-header/pane-header.component';
import {PanesComponent} from '../panes/panes.component';
import {Boolean} from '../utils/decorators';


/**
 * Pane components, are used inside {@link PanesComponent}. Each pane should have a title which is shown
 * in side tabs area. By default, the title is used for **pane header** also.
 *
 * Pane header is a thin bar on top of the selected pane which shows a label and also contains
 * some default ui controls for the pane.
 *
 * @usage
 * <ngx-panes>
 *   <!-- Simple pane with a title -->
 *    <ngx-pane title="project">...</ngx-pane>
 *
 *   <!-- Different title and header. Header is used in top of the selected pane, title is used inside pane's tab -->
 *    <ngx-pane title="structure">
 *      <div ngx-pane-header>custom header</div>
 *      ...
 *    </ngx-pane>
 * </ngx-panes>
 **/
@Component({
  selector: 'ngx-pane',
  templateUrl: './pane.component.html',
  styleUrls: ['./pane.component.scss']
})
export class PaneComponent implements OnInit {

  /**
   * Title of the pane to be shown in pane's tab.
   * It will also appear in pane's header in the absence of `ngx-pane-header`.
   */
  @Input() title: string;

  /**
   * Width of the pane. More precisely, **width** for **horizontally** aligned and **height** for **vertically**
   * aligned panes.
   * If unset, `defaultWidth` of the host `ngx-panes` will be used. If both are undefined, the content of the
   * pane will determine its width. Resizing pane (if enabled) changes the pane's width.
   */
  @Input() width: number;
  /**
   * Whether user can resize pane or not.
   */
  @Input() resizable = true;
  /**
   * unique identifier of the pane.
   */
  @Input() id: string;

  constructor(@Inject(forwardRef(() => PanesComponent)) private panesComponent: PanesComponent) {
  }

  /**
   * Whether this pane is currently opened or not.
   * @returns {boolean}
   */
  get opened() {
    return this.panesComponent.selectedPane === this;
  }


  @ContentChild(PaneHeaderComponent) header: PaneHeaderComponent;
  @ViewChild('content', {read: TemplateRef}) content;

  /**
   * Whether this pane should be opened or not. Usually used for initialization.
   * Whenever it changes to `true`, this pane will be opened (if not already opened)
   * and whenever it changes to `false` this pane will be closed if it's currently open.
   */
  @Input()
  @Boolean
  set opened(value: boolean) {
    if (value) {
      this.panesComponent.open(this);
    } else {
      if (this.opened) {
        this.close();
      }
    }
  };

  ngOnInit() {
  }

  /**
   * Opens this pane. Does nothing if already opened.
   */
  open() {
    this.panesComponent.open(this);
  }

  /**
   * Closes this pane. Does nothing if it's not opened.
   */
  close() {
    if (this.opened) {
      this.panesComponent.close();
    }
  }

}
