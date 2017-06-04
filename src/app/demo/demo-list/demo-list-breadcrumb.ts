/**
 * Created by alireza on 6/5/17.
 */

import {BreadcrumbItem, getBreadcrumbItems} from '../../breadcrumb/breadcrumb.component';

export let demoListBreadcrumb: getBreadcrumbItems = function () {
  return <BreadcrumbItem>{
    url: 'demos',
    params: [],
    label: 'Demos'
  };
};
