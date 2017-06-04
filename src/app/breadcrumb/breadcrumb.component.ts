import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET, ActivatedRouteSnapshot} from '@angular/router';
import 'rxjs/add/operator/filter';

export interface BreadcrumbItem {
  label: string;
  params: Params;
  url: string;
}
export type getBreadcrumbItems = (route?: ActivatedRouteSnapshot) => BreadcrumbItem | BreadcrumbItem[];

const routeToBreadcrumbs = (breadcrumbs: BreadcrumbItem[], route: ActivatedRoute): BreadcrumbItem[] => {
  if (route.children.length > 0) {
    breadcrumbs = breadcrumbs.concat(route.children.reduce(routeToBreadcrumbs, []));
  }
  if (typeof route.snapshot.data['getBreadcrumbItems'] === 'function') {
    return breadcrumbs.concat(route.snapshot.data['getBreadcrumbItems'](route.snapshot));
  }
  return breadcrumbs;
};

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  public breadcrumbs: BreadcrumbItem[];

  /**
   * @class DetailComponent
   * @constructor
   */
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.breadcrumbs = [];
  }

  /**
   * Let's go!
   *
   * @class DetailComponent
   * @method ngOnInit
   */
  ngOnInit() {
    // subscribe to the NavigationEnd event
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      // set breadcrumbs
      // TODO: can we prevent hard-coded 'getBreadcrumbItems'?
      this.breadcrumbs = this.activatedRoute.children.reduce(routeToBreadcrumbs, []);
    });
  }
}
