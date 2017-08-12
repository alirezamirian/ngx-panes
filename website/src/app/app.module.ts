import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MdListModule, MdToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {HeaderComponent} from './header/header.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {WithSidenavComponent} from './with-sidenav/with-sidenav.component';
import {CoreModule} from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BreadcrumbComponent,
    WithSidenavComponent
  ],
  imports: [
    SharedModule,
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdListModule,

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
