import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {demos} from './demo/demos/demos';
import {WithSidenavComponent} from './with-sidenav/with-sidenav.component';
import {HomepageComponent} from './homepage/homepage.component';


// TODO: improve this ugly breadcrumb implementation!
const routes: Routes = [
  {
    path: '',
    component: WithSidenavComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomepageComponent
      },
      {
        path: 'guides', loadChildren: './guide/guide.module#GuideModule'
      },
      {
        path: 'api', loadChildren: './api-docs/api-docs.module#ApiDocsModule'
      },
      {
        path: 'demos', loadChildren: './demo/demo.module#DemoModule'
      }
    ]
  },
  /* {
    path: '',
    redirectTo: '/demos',
    pathMatch: 'full'
   },*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [
  ]
})
export class AppRoutingModule {
}
