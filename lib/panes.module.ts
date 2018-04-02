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
import {NoHistoryDirective} from './pane-area/no-history.directive';
import {ScrollableDirective} from './scrollable.directive';
import {DefaultScrollbarsDirective} from './default-scrollbars.directive';
import {PaneTitleDirective} from './pane/pane-title.directive';
import {PaneContentDirective} from './pane/pane-content.directive';

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
    PaneTitleDirective,
    PaneContentDirective,
    PaneTabsComponent,
    PaneTabComponent,
    PaneAreaComponent,
    PaneGroupComponent,
    NoHistoryDirective,
    ScrollableDirective,
    DefaultScrollbarsDirective
  ],
  providers: [{
    provide: PaneAreaStateManager,
    useClass: LocalStoragePaneAreaStateManager
  }],
  exports: [
    PaneComponent,
    PaneHeaderComponent,
    PaneTitleDirective,
    PaneContentDirective,
    PaneAreaComponent,
    PaneGroupComponent,
    NoHistoryDirective,
    DefaultScrollbarsDirective
  ]
})
export class NgxPanesModule {

}
