import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocPageComponent} from './doc-page/doc-page.component';
import {DocItemResolverGuard} from './doc-item-resolver.guard';

const routes: Routes = [
  {
    path: 'NgxPanes/:className',
    resolve: {
      docItem: DocItemResolverGuard
    },
    component: DocPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiDocsRoutingModule {
}
