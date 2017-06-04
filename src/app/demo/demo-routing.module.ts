import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {demoListBreadcrumb, DemoListComponent} from './demo-list/demo-list.component';
import {demoItemBreadcrumb} from './demo-item/demo-item.component';
import {RoutedDemoComponent} from './routed-demo/routed-demo.component';
import {DemoResolverService} from './demo-resolver.service';


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
      getBreadcrumbItems: demoItemBreadcrumb
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
