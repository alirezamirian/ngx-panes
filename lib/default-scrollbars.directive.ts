import {Directive, Input} from '@angular/core';
import {CoerceBoolean} from './utils/decorators';

/**
 * Ensures browser default scrollbar style is preserved for child pane windows and main content area.
 *
 * You can also pass `null` to [ngx-panes-theme mixin](/guides/theming) to prevent custom scrollbar styles.
 * but it won't work for nested themes, as css for scrollbar styles is a little tricky.
 * @usage
 * <ngx-pane-area ngxPanesDefaultScrollbars>
 *   ...
 * </ngx-pane-area>
 * or
 * <ngx-pane-area [ngxPanesDefaultScrollbars]="isEnabled">
 *   ...
 * </ngx-pane-area>
 */
@Directive({
  selector: '[ngxPanesDefaultScrollbars]',
})
export class DefaultScrollbarsDirective {

  /**
   * Whether browser default scrollbar style is enabled or not
   */
    // noinspection TsLint
  @Input('ngxPanesDefaultScrollbars')
  @CoerceBoolean
  enabled: boolean;

}
