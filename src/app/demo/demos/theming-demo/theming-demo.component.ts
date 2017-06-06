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

  static samples = {
    customTheme1: `// inside a globally applied style file (e.g. styles.scss if you are using angular-cli)
@import 'ngx-panes/theming.scss';

@include ngx-panes-theme((
    primaryColor: #d2d123,
    backgroundColor: #fafafa
  ));`,
    customTheme2: `@import 'ngx-panes/theming.scss';

.ngx-theme-custom-1{
  // will be applied to all ngx-panes inside an element with ngx-theme-custom-1 class
  @include ngx-panes-theme((
    primaryColor: #d2d123,
    backgroundColor: #fafafa
  ));
}
.ngx-theme-custom-2{
  // will be applied to all ngx-panes inside an element with ngx-theme-custom-2 class
  @include ngx-panes-theme((
    primaryColor: #ff99da,
    backgroundColor: #444
  ));
}`
  };
  get samples() {
    return ThemingDemoComponent.samples;
  }
  theme: 'intellij' | 'darcula' | 'light-orange' | 'bluegrey' | 'default' = 'bluegrey';

  constructor() {
  }

  ngOnInit() {
  }

}
