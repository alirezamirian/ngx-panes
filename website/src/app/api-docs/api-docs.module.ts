import {NgModule} from '@angular/core';

import {ApiDocsRoutingModule} from './api-docs-routing.module';
import {DocPageComponent} from './doc-page/doc-page.component';
import {DocItemResolverGuard} from './doc-item-resolver.guard';
import {MatCardModule} from '@angular/material';
import {ParamsComponent} from './params/params.component';
import {SharedModule} from '../shared/shared.module';
import {DocItemComponent} from './doc-item.component';

@NgModule({
  imports: [
    SharedModule,
    MatCardModule,
    ApiDocsRoutingModule,
  ],
  providers: [DocItemResolverGuard],
  declarations: [DocPageComponent, ParamsComponent, DocItemComponent]
})
export class ApiDocsModule {
}
