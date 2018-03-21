import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiDocsService} from './api-docs.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [ApiDocsService]
})
export class CoreModule {
}
