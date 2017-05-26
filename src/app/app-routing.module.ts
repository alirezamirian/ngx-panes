import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoutedDemoComponent} from './routed-demo/routed-demo.component';
import {DemoResolverService} from './demo-resolver.service';

const routes: Routes = [
  {
    path: 'demos/:demoId',
    resolve: {
      demoModel: DemoResolverService
    },
    component: RoutedDemoComponent
  },
  {
    path: '',
    redirectTo: '/demos/1',
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
