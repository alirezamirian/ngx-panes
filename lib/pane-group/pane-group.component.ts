import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {PaneGroupService} from './pane-group.service';
import {PaneAreaComponent} from '../pane-area/pane-area.component';
import {Align, RelativeAlign, toAlign, toRelativeAlign} from '../utils/rtl-utils';

// noinspection TsLint
@Directive({
  selector: 'ngx-pane-group',
  styleUrls: ['./pane-group.component.scss'],
  providers: [
    PaneGroupService
  ]
})
export class PaneGroupDirective implements OnInit {

  private _relativeAlign: RelativeAlign;

  /**
   * Default width (in pixels) to be used for any child pane with an undefined width.
   * If you don't specify a default width, child panes will **wrap they content**.
   * @default null
   * @type {number|null}
   */
  @Input() set defaultWidth(defaultWidth: number | null) {
    this.paneGroup.setOption('defaultWidth', defaultWidth);
  };

  /**
   * Whether clicking on tabs toggles the selected panes or not. If toggleable is false, clicking on currently open
   * pane's tab will do nothing.
   * @type {boolean}
   * @default true
   */
  @Input() set toggleable(toggleable: boolean) {
    this.paneGroup.setOption('toggleable', toggleable);
  };

  /**
   * Whether or not the last pane should be opened if no pane is marked initially as opened.
   * @type {boolean}
   * @default true
   */
  @Input() set autoOpen(autoOpen: boolean) {
    this.paneGroup.setOption('autoOpen', autoOpen);
  };

  public _align: Align;

  get align() {
    return this._align;
  }

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
    if (this.paneArea) {
      this.paneArea.addGroup(this.paneGroup, this._align);
    }
  }

  constructor(private $el: ElementRef,
              private paneArea: PaneAreaComponent,
              private paneGroup: PaneGroupService) {
  }

  ngOnInit() {
    this.paneArea.addGroup(this.paneGroup, this._align);
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
