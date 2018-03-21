import {GithubBrowserDemoComponent} from './demos/github-browser-demo/github-browser-demo.component';
import {ThemingDemoComponent} from './demos/theming-demo/theming-demo.component';
import {ResizeDisabledDemoComponent} from './demos/resizing-demo/resizing-demo.component';
import {AlignDemoComponent} from './demos/align-demo/align-demo.component';
import {ConfigDemoComponent} from './demos/config-demo/config-demo.component';
import {Type} from '@angular/core';


export function getDemoComponents(): Array<Type<any>> {
  return [
    GithubBrowserDemoComponent,
    ResizeDisabledDemoComponent,
    ThemingDemoComponent,
    AlignDemoComponent,
    ConfigDemoComponent
  ];
}
