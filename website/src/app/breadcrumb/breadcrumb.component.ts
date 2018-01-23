import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Params, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

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
    return [].concat(route.snapshot.data['getBreadcrumbItems'](route.snapshot)).concat(breadcrumbs);
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
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      // set breadcrumbs
      // TODO: can we prevent hard-coded 'getBreadcrumbItems'?
      this.breadcrumbs = this.activatedRoute.children.reduce(routeToBreadcrumbs, []);
    });
  }
}
