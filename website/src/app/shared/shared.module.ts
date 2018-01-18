import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExternalLinksModule} from './external-links/external-links.module';
import {HttpModule} from '@angular/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdButtonModule, MdCardModule, MdIconModule, MdProgressSpinnerModule, MdTooltipModule} from '@angular/material';
import {NgxPanesModule} from '../../../../lib/panes.module';
import {AppLoadingComponent} from './loading.component';
import {CalloutComponent} from './callout/callout.component';
import {CodeBlockComponent} from './code-block/code-block.component';
import {CodeBlockSourceUrlDirective} from './code-block/source-url.directive';
import {SideAnchorOwnerDirective} from './side-anchor/side-anchor-owner.directive';
import {SideAnchorComponent} from './side-anchor/side-anchor.component';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdIconModule,
    MdButtonModule,
    MdTooltipModule,
    FlexLayoutModule,
    MdProgressSpinnerModule, // used in loading.component.ts
  ],
  declarations: [
    AppLoadingComponent,
    CalloutComponent,
    CodeBlockComponent,
    CodeBlockSourceUrlDirective,
    SideAnchorOwnerDirective,
    SideAnchorComponent
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
    MdCardModule,

    NgxPanesModule,
    AppLoadingComponent,
    CalloutComponent,
    CodeBlockComponent,
    CodeBlockSourceUrlDirective,
    SideAnchorOwnerDirective,
    SideAnchorComponent
  ]
})
export class SharedModule {
}
