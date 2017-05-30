import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DemoContentComponent} from './demo-content/demo-content.component';
import {NgxPanesModule} from '../../lib/panes.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdButtonModule, MdIconModule, MdListModule, MdProgressSpinnerModule, MdTooltipModule} from '@angular/material';
import {Ng2FileTreeModule} from 'ng2-file-tree';
import 'codemirror';
import 'codemirror/mode/javascript/javascript';
import {CodemirrorModule} from 'ng2-codemirror';

import {DemoService} from './demo.service';
import {FormsModule} from '@angular/forms';
import {HttpModule, XSRFStrategy} from '@angular/http';
import {DemoGithubBrowserComponent} from './demo-github-browser/demo-github-browser.component';
import {GithubFileTreeComponent} from './github-file-tree/github-file-tree.component';
import {NoopXSRFStrategy} from './noop-xsrf-strategy';
import {GithubIssueListComponent} from './github-issue-list/github-issue-list.component';
export const entryComponents = [
  DemoGithubBrowserComponent
];
const declarations = [
  DemoContentComponent,
  GithubFileTreeComponent,
  GithubIssueListComponent
].concat(<any>entryComponents);

console.log(entryComponents);


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    MdButtonModule,
    MdIconModule,
    MdTooltipModule,
    MdProgressSpinnerModule,
    MdListModule,
    Ng2FileTreeModule,
    CodemirrorModule,

    NgxPanesModule
  ],
  providers: [
    DemoService,
    {provide: XSRFStrategy, useClass: NoopXSRFStrategy}
  ],
  declarations: declarations,
  entryComponents: entryComponents
})
export class DemosModule {
}

