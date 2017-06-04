import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DemoListComponent} from './demo-list/demo-list.component';
import {RoutedDemoComponent} from './routed-demo/routed-demo.component';
import {DemoResolverService} from './demo-resolver.service';
import {demoListBreadcrumb} from './demo-list/demo-list-breadcrumb';
import {routedDemoBreadcrumb} from './routed-demo/routed-demo-breadcrumb';


export const routes: Routes = [
  {
    path: '',
    component: DemoListComponent,
    data: {
      getBreadcrumbItems: demoListBreadcrumb
    }
  },
  {
    path: ':demoId',
    data: {
      getBreadcrumbItems: routedDemoBreadcrumb
    },
    resolve: {
      demoModel: DemoResolverService
    },
    component: RoutedDemoComponent
  }
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
