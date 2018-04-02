import {NgModule} from '@angular/core';

import {DemoRoutingModule} from './demo-routing.module';
import {DemoItemComponent} from './demo-item/demo-item.component';
import {DemoListComponent} from './demo-list/demo-list.component';
import {RoutedDemoComponent} from './routed-demo/routed-demo.component';
import {SharedModule} from '../shared/shared.module';
import {
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatInputModule,
  MatListModule,
  MatSelectModule
} from '@angular/material';
import {GithubContributorsComponent} from './demos/github-browser-demo/github-contributors/github-contributors.component';
import {GithubIssueListComponent} from './demos/github-browser-demo/github-issue-list/github-issue-list.component';
import {GithubFileTreeComponent} from './demos/github-browser-demo/github-file-tree/github-file-tree.component';
import {DemoContentComponent} from './demo-content/demo-content.component';
import {Ng2FileTreeModule} from 'ng2-file-tree';
import {NoopXSRFStrategy} from './noop-xsrf-strategy';
import {XSRFStrategy} from '@angular/http';
import {DemoService} from './demo.service';

import 'codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/matchbrackets.js';
import {CodeEditorComponent} from './code-editor/code-editor.component';
import {FormsModule} from '@angular/forms';
import {getDemoComponents} from './demo-components';
import {GithubUserSelectorComponent} from './demos/github-browser-demo/github-user-selector/github-user-selector.component';
import {GithubRepoSelectorComponent} from './demos/github-browser-demo/github-repo-selector/github-repo-selector.component';
import {GithubRepoCardComponent} from './demos/github-browser-demo/github-repo-card/github-repo-card.component';
import {GithubReleaseListComponent} from './demos/github-browser-demo/github-release-list/github-release-list.component';
import {LifecycleLoggerComponent} from './demos/lazy-loading-demo/lifecycle-logger.component';

const demoComponents = getDemoComponents();

@NgModule({
  imports: [
    SharedModule,
    DemoRoutingModule,

    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule,

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
    GithubUserSelectorComponent,
    GithubRepoSelectorComponent,
    GithubRepoCardComponent,
    GithubReleaseListComponent,
    CodeEditorComponent,

    LifecycleLoggerComponent
  ].concat(demoComponents),
  entryComponents: demoComponents,
  providers: [
    {provide: XSRFStrategy, useClass: NoopXSRFStrategy},
    DemoService
  ]
})
export class DemoModule {
}
