import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExternalLinksModule} from './external-links/external-links.module';
import {GithubContributorsComponent} from './github-contributors/github-contributors.component';
import {GithubIssueListComponent} from './github-issue-list/github-issue-list.component';
import {GithubFileTreeComponent} from './github-file-tree/github-file-tree.component';
import {DemoContentComponent} from './demo-content/demo-content.component';
import {HttpModule} from '@angular/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {Ng2FileTreeModule} from 'ng2-file-tree';
import {
  MdButtonModule,
  MdIconModule,
  MdListModule,
  MdProgressSpinnerModule,
  MdTooltipModule
} from '@angular/material';
import {NgxPanesModule} from '../../lib/panes.module';
import {AppLoadingComponent} from './loading.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    Ng2FileTreeModule, // used in GithubFileTreeComponent
    MdListModule, // used in GithubIssueListComponent and GithubContributorsComponent
    MdProgressSpinnerModule,
    MdTooltipModule,
    MdIconModule,
    MdButtonModule,
    MdProgressSpinnerModule
  ],
  declarations: [
    DemoContentComponent,
    GithubFileTreeComponent,
    GithubIssueListComponent,
    GithubContributorsComponent,
    AppLoadingComponent
  ],
  exports: [
    CommonModule,
    ExternalLinksModule,

    /**
     * common angular modules
     */
    HttpModule,
    FlexLayoutModule,

    /**
     * common angular material modules
     */
    MdTooltipModule,
    MdIconModule,
    MdButtonModule,

    NgxPanesModule,

    DemoContentComponent,
    GithubFileTreeComponent,
    GithubIssueListComponent,
    GithubContributorsComponent,
    AppLoadingComponent
  ]
})
export class SharedModule {
}
