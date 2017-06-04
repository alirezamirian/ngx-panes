import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// TODO: improve this ugly breadcrumb implementation!
const routes: Routes = [
  {
    path: 'demos',
    loadChildren: './demo/demo.module#DemoModule'
  },
  {
    path: '',
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
  ]
})
export class AppRoutingModule {
}
