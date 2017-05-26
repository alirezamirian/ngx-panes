import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Demo1Component} from './demo-1/demo-1.component';
import {DemoContentComponent} from './demo-content/demo-content.component';
import {NgxPanesModule} from '../../lib/panes.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdButtonModule, MdIconModule, MdTooltipModule} from '@angular/material';
import {Ng2FileTreeModule} from 'ng2-file-tree';
import {DemoService} from './demo.service';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MdButtonModule,
    MdIconModule,
    MdTooltipModule,
    Ng2FileTreeModule,

    NgxPanesModule
  ],
  providers: [
    DemoService
  ],
  declarations: [
    DemoContentComponent,
    Demo1Component
  ],
  entryComponents: [
    Demo1Component
  ]
})
export class DemosModule {
}
