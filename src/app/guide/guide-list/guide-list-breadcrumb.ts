/**
 * Created by alireza on 6/5/17.
 */

import {BreadcrumbItem} from '../../breadcrumb/breadcrumb.component';

export function guideListBreadcrumb() {
  return <BreadcrumbItem>{
    url: 'guides',
    params: [],
    label: 'Guides'
  };
}
