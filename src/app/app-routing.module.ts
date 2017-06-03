import {NgModule} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, RouterModule, Routes} from '@angular/router';
import {RoutedDemoComponent} from './routed-demo/routed-demo.component';
import {DemoResolverService} from './demo-resolver.service';
import {DemoListComponent} from './demo-list/demo-list.component';
import {BreadcrumbItem} from './breadcrumb/breadcrumb.component';

// TODO: improve this ugly breadcrumb implementation!
const routes: Routes = [
  {
    path: 'demos',
    component: DemoListComponent,
    data: {
      getBreadcrumbItems: () => {
        return <BreadcrumbItem>{
          url: 'demos',
          params: [],
          label: 'Demos'
        };
      }
    }
  },
  {
    path: 'demos/:demoId',
    data: {
      getBreadcrumbItems: (route: ActivatedRouteSnapshot) => {
        return [
          <BreadcrumbItem>{
            url: 'demos',
            params: [],
            label: 'Demos'
          },
          <BreadcrumbItem>{
            url: '/demos/' + route.data.demoModel.metadata.id,
            params: [],
            label: route.data.demoModel.metadata.title
          }
        ];
      }
    },
    resolve: {
      demoModel: DemoResolverService
    },
    component: RoutedDemoComponent
  },
  {
    path: '',
    data: {
      breadcrumb: 'Home',
    },
    redirectTo: '/demos',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [
    DemoResolverService
  ]
})
export class AppRoutingModule {
}
