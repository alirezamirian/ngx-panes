import {NgModule} from '@angular/core';
import {MdProgressSpinnerModule} from '@angular/material';
import 'codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/edit/closebrackets.js';
import 'codemirror/addon/edit/matchbrackets.js';

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
    MdProgressSpinnerModule
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

