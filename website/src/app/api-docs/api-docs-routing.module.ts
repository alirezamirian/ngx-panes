import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocPageComponent} from './doc-page/doc-page.component';
import {DocItemResolverGuard} from './doc-item-resolver.guard';
import {apiDocsBreadcrumb} from './api-docs-breadcrumb';
import {docPageBreadcrumb} from './doc-page/doc-page-breadcrumb';

const routes: Routes = [
  {
    path: '',
    data: {
      getBreadcrumbItems: apiDocsBreadcrumb
    },
    children: [
      {
        path: ':symbol',
        data: {
          getBreadcrumbItems: docPageBreadcrumb
        },
        resolve: {
          docItem: DocItemResolverGuard
        },
        component: DocPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiDocsRoutingModule {
}
