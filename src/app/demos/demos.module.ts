import {NgModule} from '@angular/core';
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
import {NoopXSRFStrategy} from './noop-xsrf-strategy';
import {SharedModule} from '../shared/shared.module';
export const entryComponents = [
  DemoGithubBrowserComponent
];
const declarations = [].concat(<any>entryComponents);

console.log(entryComponents);


@NgModule({
  imports: [
    SharedModule,
    FormsModule, // used?
    MdProgressSpinnerModule,
    CodemirrorModule,
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

