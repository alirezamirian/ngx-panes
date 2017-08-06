import {Component, OnInit} from '@angular/core';
import {Guide} from '../../guides';


@Guide({
  id: 'theming',
  title: 'Theming Guide',
  description: 'Shows how to create a custom theme for ngx-panes and what properties can be set via a theme'
})
@Component({
  selector: 'app-theming-guide',
  templateUrl: './theming-guide.component.html',
  styleUrls: ['./theming-guide.component.scss']
})
export class ThemingGuideComponent implements OnInit {

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
    return ThemingGuideComponent.samples;
  }

  constructor() {
  }

  ngOnInit() {
  }

}
