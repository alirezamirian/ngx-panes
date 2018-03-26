import {Component, OnInit} from '@angular/core';
import {Guide} from '../../guides';
import {themeMixinBasicUsage} from '../../../../samples';

interface ThemeOption {
  name: string;
  required: boolean;
  description: string;
  defaultValue?: any;
}

@Guide({
  id: 'theming',
  title: 'Theming',
  description: 'Shows how to create a custom theme for ngx-panes and what properties can be set via a theme'
})
@Component({
  selector: 'app-theming-guide',
  templateUrl: './theming-guide.component.html',
  styleUrls: ['./theming-guide.component.scss']
})
export class ThemingGuideComponent implements OnInit {

  static samples = {
    basic: themeMixinBasicUsage,
    customTheme1: `// inside a globally applied style file (e.g. styles.scss if you are using angular-cli)
@import '~ngx-panes/theming.scss';

@include ngx-panes-theme((
    primaryColor: #d2d123,
    backgroundColor: #fafafa
  ));`,
    customTheme2: `@import '~ngx-panes/theming.scss';

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
    return ThemingGuideComponent.samples;
  }

  options: ThemeOption[] = [
    {
      name: 'primaryColor',
      required: false,
      description: 'Used for active pane tab',
      defaultValue: '#4756bf'
    },
    {
      name: 'backgroundColor',
      required: false,
      description: `Used for pane background color. By default, background color of pane tabs and 
      header will be set to a little darkened version of the backgroundColor.`,
      defaultValue: '#f0f0f0'
    },
    {
      name: 'tabsContrast',
      required: false,
      description: 'Defines how much tabs background should be darker than background.',
      defaultValue: '3%'
    },
    {
      name: 'headerContrast',
      required: false,
      description: 'Defines how much pane header background should be darker than background.',
      defaultValue: '5%'
    },
    {
      name: 'borderContrast',
      required: false,
      description: 'border color is set to foreground color. borderContrast defines how much the opacity of borders.',
      defaultValue: '20%'
    },
    {
      name: 'lightTextColor',
      required: false,
      description: 'The color to be used for text color, whenever <b>light</b> color is legible.',
      defaultValue: '#eee'
    },
    {
      name: 'darkTextColor',
      required: false,
      description: 'The color to be used for text color, whenever <b>dark</b> color is legible.',
      defaultValue: '#333'
    },
    {
      name: 'scrollbarOptions',
      required: false,
      description: `Options regarding scrollbar styles. It only works on 
<a href="https://en.wikipedia.org/wiki/List_of_web_browsers#WebKit-based">WebKit-based browsers</a>. <br/>
Passing <code>null</code> will result in default browser scrollbar styles. You can also use
<a href="/api/DefaultScrollbarsDirective">ngxDefaultScrollbars</a> directive to disable custom
scrollbar style in an instance basis.
<br />
Value should be a map with any subset of the following keys:
<ul>
  <li><code>width</code>: width of the scrollbar</li>
  <li><code>thumbColor</code>: color of scroller rectangle</li>
  <li><code>trackColor</code>: background color of the scrollbar</li>
</ul>
`,
      defaultValue: '(width: 10px)'
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
