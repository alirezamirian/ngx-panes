import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {demos} from './demo/demos/demos';
import {WithSidenavComponent} from './with-sidenav/with-sidenav.component';
import {getGuideComponents} from './guide/guide-components';


// A workaround for being able to list all guides when guides module is not loaded yet.
// Similar approach should be used for demos in absense of a better solution.
// It kind of contradicts with lazy loading of guides and demos modules, but not 100%!
getGuideComponents();

// TODO: improve this ugly breadcrumb implementation!
const routes: Routes = [
  {
    path: 'demos',
    loadChildren: './demo/demo.module#DemoModule'
  },
  {
    path: '',
    component: WithSidenavComponent,
    children: [
      {
        path: 'guides', loadChildren: './guide/guide.module#GuideModule'
      },
      {
        path: 'api', loadChildren: './api-docs/api-docs.module#ApiDocsModule'
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
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: [],
  providers: [
  ]
})
export class AppRoutingModule {
}
