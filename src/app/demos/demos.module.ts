import {NgModule} from '@angular/core';
import {MdProgressSpinnerModule} from '@angular/material';
import 'codemirror';
import 'codemirror/mode/javascript/javascript';
import {CodemirrorModule} from 'ng2-codemirror';

import {DemoService} from './demo.service';
import {FormsModule} from '@angular/forms';
import {XSRFStrategy} from '@angular/http';
import {GithubBrowserDemoComponent} from './github-browser-demo/github-browser-demo.component';
import {NoopXSRFStrategy} from './noop-xsrf-strategy';
import {SharedModule} from '../shared/shared.module';
import {ResizeDisabledDemoComponent} from './resize-disabled-demo/resize-disabled-demo.component';
export const entryComponents = [
  GithubBrowserDemoComponent,
  ResizeDisabledDemoComponent
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

