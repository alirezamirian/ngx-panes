import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {getBreadcrumbItems} from '../../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-demo-item',
  templateUrl: './demo-item.component.html',
  styleUrls: ['./demo-item.component.scss']
})
export class DemoItemComponent implements OnInit {

  @Input() demo;
  @Output() tagClicked = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}


export const demoItemBreadcrumb: getBreadcrumbItems = function (route: ActivatedRouteSnapshot) {
  return [
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
};
