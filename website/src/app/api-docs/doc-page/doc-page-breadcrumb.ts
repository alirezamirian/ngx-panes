/**
 * Created by alireza on 6/5/17.
 */

import {BreadcrumbItem} from '../../breadcrumb/breadcrumb.component';
import {ActivatedRouteSnapshot} from '@angular/router';

export function docPageBreadcrumb(route: ActivatedRouteSnapshot) {
  return <BreadcrumbItem>{
    url: `api/NgxPanes/${route.data.docItem.className}`,
    params: [],
    label: route.data.docItem.className
  };
}
