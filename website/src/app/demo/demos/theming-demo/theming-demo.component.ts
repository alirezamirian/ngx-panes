import {Component, OnInit} from '@angular/core';
import {Demo} from '../demos';


type ThemeName = 'intellij' | 'darcula' | 'light-orange' | 'bluegrey';

interface Example {
  theme: ThemeName | null;
  code: string;
}

@Demo({
  id: 'theming',
  title: 'Theming',
  description: 'Demonstrates how to customize ngx-panes appearance',
  order: 2,
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

  examples: [Example] = [
    {
      theme: null,
      code: ''
    }, {
      theme: `intellij`,
      code: `.theme-intellij {
  @include ngx-panes-theme((
    primaryColor: #b7b7b7,
    backgroundColor: #fff,
    tabsContrast: 9%,
    headerContrast: 7%,
    borderContrast: 30%
  ));
}`
    }, {
      theme: 'light-orange',
      code: `.theme-light-orange {
  @include ngx-panes-theme((
    primaryColor: #ef6c00,
    backgroundColor: #fff3e0
  ));
}`
    }, {
      theme: 'bluegrey',
      code: `.theme-bluegrey {
  @include ngx-panes-theme((
    primaryColor: #546e7a,
    backgroundColor: #eceff1
  ));
}`
    }, {
      theme: 'darcula',
      code: `.theme-darcula {
  @include ngx-panes-theme((
    primaryColor: #2d2f30,
    backgroundColor: #3c3f41,
    tabsContrast: 0%,
  ));
}`
    },
  ];

  selection: Example = this.examples[0];

  constructor() {
  }

  ngOnInit() {
  }

}
