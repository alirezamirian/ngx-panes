import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdCardModule, MdChipsModule, MdListModule, MdToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {NgxPanesModule} from '../lib/panes.module';
import {DemosModule} from './demos/demos.module';
import {RoutedDemoComponent} from './routed-demo/routed-demo.component';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {DemoListComponent} from './demo-list/demo-list.component';
import {HeaderComponent} from './header/header.component';
import {DemoItemComponent} from './demo-item/demo-item.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutedDemoComponent,
    DemoListComponent,
    HeaderComponent,
    DemoItemComponent,
    BreadcrumbComponent
  ],
  imports: [
    SharedModule,
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxPanesModule,
    HttpModule,
    MdToolbarModule,
    MdListModule,
    MdCardModule,
    MdChipsModule,

    AppRoutingModule,
    DemosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
