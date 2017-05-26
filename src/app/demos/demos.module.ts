import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DemoContentComponent} from './demo-content/demo-content.component';
import {NgxPanesModule} from '../../lib/panes.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdButtonModule, MdIconModule, MdTooltipModule} from '@angular/material';
import {Ng2FileTreeModule} from 'ng2-file-tree';
import 'codemirror';
import 'codemirror/mode/javascript/javascript';
import {CodemirrorModule} from 'ng2-codemirror';

import {DemoService} from './demo.service';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {Demo1Component} from './demo-1/demo-1.component';

export const entryComponents = [
  Demo1Component
];
const declarations = [
  DemoContentComponent
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
    Ng2FileTreeModule,
    CodemirrorModule,

    NgxPanesModule
  ],
  providers: [
    DemoService
  ],
  declarations: declarations,
  entryComponents: entryComponents
})
export class DemosModule {
}
