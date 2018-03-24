import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemoListComponent} from './demo-list/demo-list.component';
import {RoutedDemoComponent} from './routed-demo/routed-demo.component';
import {DemoResolverService} from './demo-resolver.service';
import {demoListBreadcrumb} from './demo-list/demo-list-breadcrumb';
import {routedDemoBreadcrumb} from './routed-demo/routed-demo-breadcrumb';


const demoRoute = {
  path: ':demoId',
  data: {
    getBreadcrumbItems: routedDemoBreadcrumb,
    noPadding: true
  },
  resolve: {
    demoModel: DemoResolverService
  },
  component: RoutedDemoComponent
};
export const routes: Routes = [
  {
    path: '',
    component: DemoListComponent,
    data: {
      getBreadcrumbItems: demoListBreadcrumb
    }
  },
  demoRoute,
  // this is absolute hack! can be fixed by changing each demo to be a separate module with each own routing
  {...demoRoute, ...{path: ':demoId/:p1'}},
  {...demoRoute, ...{path: ':demoId/:p1/:p2'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    DemoResolverService
  ]
})
export class DemoRoutingModule {
}
