import {NgModule} from '@angular/core';

import {ApiDocsRoutingModule} from './api-docs-routing.module';
import {DocPageComponent} from './doc-page/doc-page.component';
import {DocItemResolverGuard} from './doc-item-resolver.guard';
import {MatCardModule, MatListModule, MatRippleModule} from '@angular/material';
import {ParamsComponent} from './params/params.component';
import {SharedModule} from '../shared/shared.module';
import {DocItemComponent} from './doc-item.component';
import {ApiDocsComponent} from './api-docs/api-docs.component';
import {SimplifyDescriptionPipe} from './simplify-description.pipe';

@NgModule({
  imports: [
    SharedModule,
    MatCardModule,
    ApiDocsRoutingModule,
    MatListModule,
    MatRippleModule
  ],
  providers: [DocItemResolverGuard],
  declarations: [DocPageComponent, ParamsComponent, DocItemComponent, ApiDocsComponent, SimplifyDescriptionPipe]
})
export class ApiDocsModule {
}
