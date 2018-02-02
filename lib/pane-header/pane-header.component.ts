import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

/**
 * `ngx-pane-header` is used for providing custom headers for panes.
 *
 * By default the header of the pane consist of a simple text label
 * (which is determined by {@link PaneComponent#title PaneComponent title input}).
 * You can override this behaviour, however and use custom content as
 * pane header by using a `<ngx-pane-header>...</ngx-pane-header>` inside
 * `<ngx-pane>...</ngx-pane>` component.
 * @usage
 * <ngx-panes>
 *   <ngx-pane title="First Pane">
 *     <ngx-pane-header>this is a <b>special</b> header</ngx-pane-header>
 *     <!-- pane content goes here -->
 *   </ngx-pane>
 *   <ngx-pane title="will be used for header in absense of ngx-pane-header">...</ngx-pane>
 * </ngx-panes>
 */
@Component({
  selector: 'ngx-pane-header',
  templateUrl: './pane-header.component.html',
  styleUrls: ['./pane-header.component.scss']
})
export class PaneHeaderComponent implements OnInit {

  @ViewChild('content')
  public templateRef: TemplateRef<any>;

  constructor() {
  }

  ngOnInit() {
  }

}
