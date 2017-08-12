import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ApiDocsRoutingModule} from './api-docs-routing.module';
import {DocPageComponent} from './doc-page/doc-page.component';
import {DocItemResolverGuard} from './doc-item-resolver.guard';

@NgModule({
  imports: [
    CommonModule,
    ApiDocsRoutingModule
  ],
  providers: [DocItemResolverGuard],
  declarations: [DocPageComponent]
})
export class ApiDocsModule {
}
