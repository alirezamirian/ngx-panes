import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdToolbarModule} from '@angular/material';

import {AppComponent} from './app.component';
import {PanesComponent} from '../lib/panes/panes.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PaneComponent } from '../lib/pane/pane.component';
import { DemoContentComponent } from './demo-content/demo-content.component';

@NgModule({
  declarations: [
    AppComponent,
    PanesComponent,
    PaneComponent,
    DemoContentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    FlexLayoutModule,
    MdToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
