import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoutedDemoComponent} from './routed-demo/routed-demo.component';
import {DemoResolverService} from './demo-resolver.service';
import {demos} from './demos/demos';

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
    redirectTo: '/demos/' + demos[0].metadata.id,
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
