import {ActivatedRouteSnapshot} from '@angular/router';

// defining type for function (which requires using function expression instead of statement)
// leads to ERROR in Error encountered resolving symbol values statically...
export function routedGuideBreadcrumb(route: ActivatedRouteSnapshot) {
  return [
    {
      url: '/guides/' + route.data.guideModel.metadata.id,
      params: [],
      label: route.data.guideModel.metadata.title
    }
  ];
}
