import {Directive, TemplateRef} from '@angular/core';

/**
 * A directive for lazy loading content of pane.
 *
 * By default, content of all panes inside pane area are
 * instantiated eagerly. You can delay instantiation of pane content, until
 * it's opened, by wrapping it inside
 * an `ng-template` with `ngxPaneContent` on it. Similar to any other
 * [structural directive](https://angular.io/guide/structural-directives#the-asterisk--prefix),
 * you can also use it without `ng-template` by adding `*ngxPaneContent` directly on the root of
 * the pane content.
 *
 * Please note that, by using `ngxPaneContent`, content of the pane are instantiated **every time** it's opened.
 * It means life cycle hooks like `ngOnInit` will be called every time the pane is opened.
 *
 * @usage
 * <ngx-pane>
 *   <ng-template ngxPaneContent>
 *     ...
 *   </ng-template>
 * </ngx-pane>
 *
 * @usage
 * <ngx-pane>
 *   <any *ngxPaneContent>
 *     ...
 *   </any>
 * </ngx-pane>
 */
@Directive({
  selector: '[ngxPaneContent]'
})
export class PaneContentDirective {
  // Note that adding TemplateRef to constructor arguments, conveys it's an structural directive and prevent
  // invalid usages by causing an error when it's not used as an structural directive.
  constructor(templateRef: TemplateRef<any>) {
  }
}
