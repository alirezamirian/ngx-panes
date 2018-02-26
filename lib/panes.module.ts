/**
 * Created by alireza on 5/22/17.
 */

import {NgModule} from '@angular/core';
import {PaneComponent} from './pane/pane.component';
import {PaneResizerComponent} from './pane-resizer/pane-resizer.component';
import {CommonModule} from '@angular/common';
import {PaneViewComponent} from './pane-view/pane-view.component';
import {PaneHeaderComponent} from './pane-header/pane-header.component';
import {PaneTabsComponent} from './pane-tabs/pane-tabs.component';
import {PaneTabComponent} from './pane-tab/pane-tab.component';
import {PaneAreaComponent} from './pane-area/pane-area.component';
import {PaneGroupComponent} from './pane-group/pane-group.component';
import {LocalStoragePaneAreaStateManager, PaneAreaStateManager} from './pane-area-state-manager';

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
    PaneComponent,
    PaneResizerComponent,
    PaneViewComponent,
    PaneHeaderComponent,
    PaneTabsComponent,
    PaneTabComponent,
    PaneAreaComponent,
    PaneGroupComponent
  ],
  providers: [{
    provide: PaneAreaStateManager,
    useClass: LocalStoragePaneAreaStateManager
  }],
  exports: [
    PaneComponent,
    PaneHeaderComponent,
    PaneAreaComponent,
    PaneGroupComponent
  ]
})
export class NgxPanesModule {

}
