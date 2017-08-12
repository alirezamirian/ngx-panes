/**
 * Created by alireza on 6/5/17.
 */

import {BreadcrumbItem} from '../breadcrumb/breadcrumb.component';

export function apiDocsBreadcrumb() {
  return <BreadcrumbItem>{
    url: 'api',
    params: [],
    label: 'Api Docs'
  };
}
