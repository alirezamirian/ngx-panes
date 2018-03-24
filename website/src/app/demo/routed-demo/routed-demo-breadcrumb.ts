import {ActivatedRouteSnapshot} from '@angular/router';

// defining type for function (which requires using function expression instead of statement)
// leads to ERROR in Error encountered resolving symbol values statically...
export function routedDemoBreadcrumb(route: ActivatedRouteSnapshot) {
  const parts = [
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
  if (route.params.p1) {
    parts.push({
      url: `/demos/${route.data.demoModel.metadata.id}/${route.params.p1}`,
      params: [],
      label: route.params.p1
    });
  }
  if (route.params.p2) {
    parts.push({
      url: `/demos/${route.data.demoModel.metadata.id}/${route.params.p2}`,
      params: [],
      label: route.params.p2
    });
  }
  return parts;
}
