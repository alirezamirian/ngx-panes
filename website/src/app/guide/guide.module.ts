import {NgModule} from '@angular/core';

import {GuideRoutingModule} from './guide-routing.module';
import {ThemingGuideComponent} from './guides/theming-guide/theming-guide.component';
import {SharedModule} from '../shared/shared.module';
import {GuideService} from './guide.service';
import {RoutedGuideComponent} from './routed-guide/routed-guide.component';
import {GuideListComponent} from './guide-list/guide-list.component';
import {MdListModule} from '@angular/material';

var entryComponents = [
  ThemingGuideComponent
];
@NgModule({
  imports: [
    SharedModule,
    GuideRoutingModule,
    MdListModule
  ],
  providers: [
    GuideService
  ],
  entryComponents,
  declarations: [...entryComponents, RoutedGuideComponent, GuideListComponent]
})
export class GuideModule {
}
