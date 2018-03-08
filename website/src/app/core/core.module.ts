import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiDocsService} from './api-docs.service';
import {GuideService} from './guide.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ApiDocsService, GuideService]
})
export class CoreModule {
}
