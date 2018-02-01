/**
 * Created by alireza on 5/22/17.
 */

import {NgModule} from '@angular/core';
import {PanesComponent} from './panes/panes.component';
import {PaneComponent} from './pane/pane.component';
import {PaneResizerComponent} from './pane-resizer/pane-resizer.component';
import {CommonModule} from '@angular/common';
import {PaneViewComponent} from './pane-view.component';
import {PaneHeaderComponent} from './pane-header/pane-header.component';

/**
 * The main module for ngx-panes. Add it to `imports` of your module.
 *
 * @usage
 * &#64;NgModule({
 *  imports: [
 *    // ...
 *    NgxPanesModule
 *    //...
 *  ]
 * })
 * export class AppModule{
 * }
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PanesComponent,
    PaneComponent,
    PaneResizerComponent,
    PaneViewComponent,
    PaneHeaderComponent
  ],
  exports: [
    PanesComponent,
    PaneComponent,
    PaneHeaderComponent
  ]
})
export class NgxPanesModule {

}
