import {GithubBrowserDemoComponent} from './demos/github-browser-demo/github-browser-demo.component';
import {ThemingDemoComponent} from './demos/theming-demo/theming-demo.component';
import {ResizingDemoComponent} from './demos/resizing-demo/resizing-demo.component';
import {AlignDemoComponent} from './demos/align-demo/align-demo.component';
import {ConfigDemoComponent} from './demos/config-demo/config-demo.component';
import {Type} from '@angular/core';
import {LazyLoadingDemoComponent} from './demos/lazy-loading-demo/lazy-loading-demo.component';


export function getDemoComponents(): Array<Type<any>> {
  return [
    GithubBrowserDemoComponent,
    ResizingDemoComponent,
    ThemingDemoComponent,
    AlignDemoComponent,
    ConfigDemoComponent,
    LazyLoadingDemoComponent
  ];
}
