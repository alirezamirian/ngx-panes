import {Directive, TemplateRef} from '@angular/core';

/**
 * A directive for using custom content as title of panes, shown in pane tab. It can be used instead of
 * {@link PaneComponent#title title input} when the title is not a simple text.
 *
 * @usage
 * <ngx-pane>
 *   <ng-template ngxPaneTitle>
 *     ...
 *   </ng-template>
 *   <!-- pane content goes here -->
 * </ngx-pane>
 *
 * @usage
 * <ngx-pane>
 *   <any *ngxPaneTitle>
 *     ...
 *   </any>
 *   <!-- pane content goes here -->
 * </ngx-pane>
 */
@Directive({
  selector: '[ngxPaneTitle]'
})
export class PaneTitleDirective {

  constructor(public templateRef: TemplateRef<any>) {
  }
}
