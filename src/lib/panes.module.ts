import {NgModule} from '@angular/core';
import {PanesComponent} from './panes/panes.component';
import {PaneComponent} from './pane/pane.component';
import {PaneResizerComponent} from './pane-resizer/pane-resizer.component';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
/**
 * Created by alireza on 5/22/17.
 */


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [
    PanesComponent,
    PaneComponent,
    PaneResizerComponent
  ],
  exports: [
    PanesComponent,
    PaneComponent
  ]
})
export class NgxPanesModule {

}