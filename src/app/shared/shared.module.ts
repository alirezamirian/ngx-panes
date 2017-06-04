import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExternalLinksModule} from './external-links/external-links.module';
import {HttpModule} from '@angular/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {Ng2FileTreeModule} from 'ng2-file-tree';
import {
  MdButtonModule,
  MdIconModule,
  MdListModule,
  MdProgressSpinnerModule,
  MdTooltipModule
} from '@angular/material';
import {NgxPanesModule} from '../../lib/panes.module';
import {AppLoadingComponent} from './loading.component';

@NgModule({
  imports: [
    CommonModule,
    MdProgressSpinnerModule, // used in loading.component.ts
  ],
  declarations: [
    AppLoadingComponent
  ],
  exports: [
    CommonModule,
    ExternalLinksModule,

    /**
     * common angular modules
     */
    HttpModule,
    FlexLayoutModule,

    /**
     * common angular material modules
     */
    MdTooltipModule,
    MdIconModule,
    MdButtonModule,
    MdProgressSpinnerModule,

    NgxPanesModule,
    AppLoadingComponent
  ]
})
export class SharedModule {
}
