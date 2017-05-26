import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {NgxPanesModule} from '../lib/panes.module';
import {DemosModule} from './demos/demos.module';
import {RoutedDemoComponent} from './routed-demo/routed-demo.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    RoutedDemoComponent
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxPanesModule,
    HttpModule,
    MdToolbarModule,

    AppRoutingModule,
    DemosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
