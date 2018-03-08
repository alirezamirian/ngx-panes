import {StateManagementGuideComponent} from './guides/state-management-guide/state-management-guide.component';
import {GettingStartedGuideComponent} from './guides/getting-started-guide/getting-started-guide.component';
import {ThemingGuideComponent} from './guides/theming-guide/theming-guide.component';


export function getGuideComponents() {
  return [
    GettingStartedGuideComponent,
    ThemingGuideComponent,
    StateManagementGuideComponent
  ];
}
