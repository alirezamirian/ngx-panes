import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DemoRoutingModule} from './demo-routing.module';
import {DemoItemComponent} from './demo-item/demo-item.component';
import {DemoListComponent} from './demo-list/demo-list.component';
import {RoutedDemoComponent} from './routed-demo/routed-demo.component';
import {SharedModule} from '../shared/shared.module';
import {MatCardModule, MatChipsModule, MatListModule} from '@angular/material';
import {GithubContributorsComponent} from './github-contributors/github-contributors.component';
import {GithubIssueListComponent} from './github-issue-list/github-issue-list.component';
import {GithubFileTreeComponent} from './github-file-tree/github-file-tree.component';
import {DemoContentComponent} from './demo-content/demo-content.component';
import {Ng2FileTreeModule} from 'ng2-file-tree';
import {NoopXSRFStrategy} from './noop-xsrf-strategy';
import {XSRFStrategy} from '@angular/http';
import {DemoService} from './demo.service';
import {ResizeDisabledDemoComponent} from './demos/resizing-demo/resizing-demo.component';
import {GithubBrowserDemoComponent} from './demos/github-browser-demo/github-browser-demo.component';

import 'codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/matchbrackets.js';
import {CodeEditorComponent} from './code-editor/code-editor.component';
import {ThemingDemoComponent} from './demos/theming-demo/theming-demo.component';
import {AlignDemoComponent} from './demos/align-demo/align-demo.component';
import {ConfigDemoComponent} from './demos/config-demo/config-demo.component';

export const entryComponents = [
  GithubBrowserDemoComponent,
  ResizeDisabledDemoComponent,
  ThemingDemoComponent,
  AlignDemoComponent,
  ConfigDemoComponent
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    DemoRoutingModule,

    MatListModule,
    MatCardModule,
    MatChipsModule,

    Ng2FileTreeModule, // used in GithubFileTreeComponent

  ],
  declarations: [

    RoutedDemoComponent,
    DemoListComponent,
    DemoItemComponent,

    DemoContentComponent,
    GithubFileTreeComponent,
    GithubIssueListComponent,
    GithubContributorsComponent,
    CodeEditorComponent
  ].concat(<any>entryComponents),
  entryComponents: entryComponents,
  providers: [
    {provide: XSRFStrategy, useClass: NoopXSRFStrategy},
    DemoService
  ]
})
export class DemoModule {
}
