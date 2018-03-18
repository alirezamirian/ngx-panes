import {NgModule} from '@angular/core';

import {GuideRoutingModule} from './guide-routing.module';
import {SharedModule} from '../shared/shared.module';
import {RoutedGuideComponent} from './routed-guide/routed-guide.component';
import {GuideListComponent} from './guide-list/guide-list.component';
import {MatListModule, MatSnackBarModule} from '@angular/material';
import {GettingStartedGuideComponent} from './guides/getting-started-guide/getting-started-guide.component';
import {StateManagementGuideComponent} from './guides/state-management-guide/state-management-guide.component';
import {getGuideComponents} from './guide-components';
import {CustomPaneAreaStateManagerDirective} from './guides/state-management-guide/directives/custom-pane-area-state-manager.directive';

const guideComponents = getGuideComponents();

@NgModule({
  imports: [
    SharedModule,
    GuideRoutingModule,
    MatListModule,
    MatSnackBarModule
  ],
  providers: [],
  entryComponents: guideComponents,
  declarations: [...guideComponents, RoutedGuideComponent, GuideListComponent, GettingStartedGuideComponent, StateManagementGuideComponent, CustomPaneAreaStateManagerDirective]
})
export class GuideModule {
}
