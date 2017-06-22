/**
 * Created by alireza on 6/5/17.
 */

import {BreadcrumbItem} from '../../breadcrumb/breadcrumb.component';

export function demoListBreadcrumb() {
  return <BreadcrumbItem>{
    url: 'demos',
    params: [],
    label: 'Demos'
  };
}
