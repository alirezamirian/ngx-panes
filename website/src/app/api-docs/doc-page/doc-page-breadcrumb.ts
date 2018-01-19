/**
 * Created by alireza on 6/5/17.
 */

import {BreadcrumbItem} from '../../breadcrumb/breadcrumb.component';
import {ActivatedRouteSnapshot} from '@angular/router';

export function docPageBreadcrumb(route: ActivatedRouteSnapshot) {
  return <BreadcrumbItem>{
    url: `api/${route.data.docItem.identifier}`,
    params: [],
    label: route.data.docItem.identifier
  };
}
