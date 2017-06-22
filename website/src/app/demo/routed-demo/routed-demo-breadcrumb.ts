import {ActivatedRouteSnapshot} from '@angular/router';

// defining type for function (which requires using function expression instead of statement)
// leads to ERROR in Error encountered resolving symbol values statically...
export function routedDemoBreadcrumb(route: ActivatedRouteSnapshot) {
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
}
