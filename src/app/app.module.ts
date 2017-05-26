import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdButtonModule, MdIconModule, MdToolbarModule, MdTooltipModule} from '@angular/material';
import {Ng2FileTreeModule} from 'ng2-file-tree';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {DemoContentComponent} from './demo-content/demo-content.component';
import {NgxPanesModule} from '../lib/panes.module';

@NgModule({
  declarations: [
    AppComponent,
    DemoContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxPanesModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdTooltipModule,
    Ng2FileTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
