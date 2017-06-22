import {Component, OnInit} from '@angular/core';
import {Demo} from '../demos';


@Demo({
  id: 'theming',
  title: 'Theming',
  description: 'Demonstrates how to customize ngx-panes appearance',
  tags: ['Theming']
})
@Component({
  selector: 'app-theming-demo',
  templateUrl: './theming-demo.component.html',
  styleUrls: [
    '../../shared-demo-styles.scss',
    './theming-demo.component.scss',
  ]
})
export class ThemingDemoComponent implements OnInit {

  theme: 'intellij' | 'darcula' | 'light-orange' | 'bluegrey' | 'default' = 'bluegrey';

  constructor() {
  }

  ngOnInit() {
  }

}
