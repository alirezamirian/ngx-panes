import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExternalLinksModule} from './external-links/external-links.module';
import {HttpModule} from '@angular/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatTooltipModule
} from '@angular/material';
import {NgxPanesModule} from '../../../../lib/panes.module';
import {AppLoadingComponent} from './loading.component';
import {CalloutComponent} from './callout/callout.component';
import {CodeBlockComponent} from './code-block/code-block.component';
import {CodeBlockSourceUrlDirective} from './code-block/source-url.directive';
import {SideAnchorOwnerDirective} from './side-anchor/side-anchor-owner.directive';
import {SideAnchorComponent} from './side-anchor/side-anchor.component';
import {RouterModule} from '@angular/router';

// import {NgxPanesModule} from 'ngx-panes'; // for testing production bundle

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatRippleModule,
    MatProgressSpinnerModule, // used in loading.component.ts
    RouterModule
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
    MatRippleModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,

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
