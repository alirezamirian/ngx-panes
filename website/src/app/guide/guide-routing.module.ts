import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuideResolverService} from './guide-resolver.service';
import {RoutedGuideComponent} from './routed-guide/routed-guide.component';
import {GuideListComponent} from './guide-list/guide-list.component';
import {guideListBreadcrumb} from './guide-list/guide-list-breadcrumb';
import {routedGuideBreadcrumb} from './routed-guide/routed-guide-breadcrumb';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GuideListComponent,
    data: {
      getBreadcrumbItems: guideListBreadcrumb
    }
  },
  {
    path: ':id',
    resolve: {
      guideModel: GuideResolverService
    },
    component: RoutedGuideComponent,
    data: {
      getBreadcrumbItems: routedGuideBreadcrumb
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [GuideResolverService]
})
export class GuideRoutingModule {
}
