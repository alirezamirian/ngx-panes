import {InjectionToken} from '@angular/core';

/**
 * Injection token for providing defaults for input parameters of components
 * such as {@link PaneGroupComponent} or {@link PaneAreaComponent}.
 * The value of this injection token must be of type {@link NgxPanesDefaults}.
 *
 * See also [configuration demo](/demos/config).
 * @usage
 *
 * const panesDefaults: NgxPanesDefaults = {
 *   resizable: false
 * };
 *
 * // Configuring global defaults for all panes in the app.
 * &#64;NgModule({
 *    //...
 *    providers: [
 *      // ...
 *      {
 *        provide: NGX_PANES_DEFAULTS,
 *        useValue: panesDefaults
 *      }
 *    ]
 * })
 * export class AppModule {}
 *
 * // Configuring defaults for all child panes of SomeComponent.
 * &#64;Component({
 *  // ...
 *  providers: [
 *    {
 *        provide: NGX_PANES_DEFAULTS,
 *        useValue: panesDefaults
 *    }
 *  ]
 * })
 * class SomeComponent{}
 * @type {InjectionToken<NgxPanesDefaults>}
 */
export const NGX_PANES_DEFAULTS = new InjectionToken<NgxPanesDefaults>('ngx-panes configuration object');

/**
 * Configuration to be provided to set default values for some inputs.
 * Object of this type provided as {@link NGX_PANES_DEFAULTS} injection token will be picked up
 * related components (such as {@link PaneGroupComponent} and {@link PaneAreaComponent}).
 */
export interface NgxPanesDefaults {
  /**
   * Default value for {@link PaneAreaComponent#tabsDraggable} input.
   */
  draggable: boolean;
  /**
   * Default value for {@link PaneGroupComponent#resizable} input.
   */
  resizable?: boolean;
  /**
   * Default value for {@link PaneGroupComponent#autoOpen} input.
   */
  autoOpen?: boolean;
  /**
   * Default value for {@link PaneGroupComponent#toggleable} input.
   */
  toggleable?: boolean;
  /**
   * Default value for {@link PaneGroupComponent#defaultSize} input.
   */
  defaultSize?: number;
}
