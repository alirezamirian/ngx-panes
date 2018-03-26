import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExternalLinksModule} from './external-links/external-links.module';
import {HttpModule} from '@angular/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatTooltipModule
} from '@angular/material';
import {NgxPanesModule} from '../../../../lib/panes.module';
import {AppLoadingComponent} from './loading/loading.component';
import {CalloutComponent} from './callout/callout.component';
import {CodeBlockComponent} from './code-block/code-block.component';
import {CodeBlockSourceUrlDirective} from './code-block/source-url.directive';
import {SideAnchorOwnerDirective} from './side-anchor/side-anchor-owner.directive';
import {SideAnchorComponent} from './side-anchor/side-anchor.component';
import {RouterModule} from '@angular/router';
import {NumberAbbrevPipe} from './number-abbrev.pipe';
import {ListWrapperComponent} from './list-wrapper.component';
import {KebabCasePipe} from './kebab-case.pipe';
import {RouterLinksFromHrefsDirective} from './router-links-from-hrefs.directive';

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
    ListWrapperComponent,
    AppLoadingComponent,
    CalloutComponent,
    CodeBlockComponent,
    CodeBlockSourceUrlDirective,
    SideAnchorOwnerDirective,
    SideAnchorComponent,
    NumberAbbrevPipe,
    KebabCasePipe,
    RouterLinksFromHrefsDirective
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
    MatAutocompleteModule,

    NgxPanesModule,
    ListWrapperComponent,
    AppLoadingComponent,
    CalloutComponent,
    CodeBlockComponent,
    CodeBlockSourceUrlDirective,
    SideAnchorOwnerDirective,
    SideAnchorComponent,
    NumberAbbrevPipe,
    KebabCasePipe,
    RouterLinksFromHrefsDirective
  ]
})
export class SharedModule {
}
