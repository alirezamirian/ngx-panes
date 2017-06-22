import {Component, ContentChild, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PaneHeaderDirective} from '../pane-header.directive';

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
   * pane will determine it's width. Resizing pane (if enabled) will change/set the pane's width.
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

  @ContentChild(PaneHeaderDirective) header: PaneHeaderDirective;
  @ViewChild('content', {read: TemplateRef}) content;
  constructor() { }

  ngOnInit() {
  }

}
