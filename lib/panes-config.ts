import {InjectionToken} from '@angular/core';

/**
 * Injection token for providing defaults for some input parameters of {@link PaneGroupComponent pane components}.
 * The value of this injection token must be of type {@link PanesDefaults}.
 *
 * See also [configuration demo](/demos/config).
 * @usage
 *
 * const panesDefaults: PanesDefaults = {
 *   resizable: false
 * };
 *
 * // Configuring global defaults for all panes in the app.
 * &#64;NgModule({
 *    //...
 *    providers: [
 *      // ...
 *      {
 *        provide: PANES_DEFAULTS,
 *        useValue: panesDefaults
 *      }
 *    ]
 * })
 * export class AppModule {}
 *
 * // Configuring defaults for all child panes of some component.
 * &#64;Component({
 *  // ...
 *  providers: [
 *    {
 *        provide: PANES_DEFAULTS,
 *        useValue: panesDefaults
 *    }
 *  ]
 * })
 * class SomeComponent{}
 * @type {InjectionToken<PanesDefaults>}
 */
export const PANES_DEFAULTS = new InjectionToken<PanesDefaults>('ngx-panes configuration object');

/**
 * Configuration to be provided as default parameters for all `ngx-panes` child components.
 * Object of this type provided as {@link PANES_DEFAULTS} injection token will be picked up
 * {@link PaneGroupComponent} to use them for default values of some configuration inputs.
 */
export interface PanesDefaults {
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
