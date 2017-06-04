import {ActivatedRouteSnapshot} from '@angular/router';
import {getBreadcrumbItems} from '../../breadcrumb/breadcrumb.component';

export const routedDemoBreadcrumb: getBreadcrumbItems = function (route: ActivatedRouteSnapshot) {
  return [
    {
      url: 'demos',
      params: [],
      label: 'Demos'
    },
    {
      url: '/demos/' + route.data.demoModel.metadata.id,
      params: [],
      label: route.data.demoModel.metadata.title
    }
  ];
};
