import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiDocsService} from './api-docs.service';
import {HttpClientModule} from '@angular/common/http';
import {DemoSearchProviderService} from './search/demo-search-provider.service';
import {SearchProvider} from './search/search-provider';
import {ContentService} from './content.service';
import {SearchService} from './search/search.service';
import {GuideSearchProviderService} from './search/guide-search-provider.service';
import {ApiDocsSearchProviderService} from './search/api-docs-search-provider.service';
import {SimplifyDescriptionPipe} from '../api-docs/simplify-description.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiDocsService,
    ContentService,
    SearchService,
    {provide: SearchProvider, useClass: DemoSearchProviderService, multi: true},
    {provide: SearchProvider, useClass: GuideSearchProviderService, multi: true},
    {provide: SearchProvider, useClass: ApiDocsSearchProviderService, multi: true},
    SimplifyDescriptionPipe // to be able to inject it in ApiDocsSearchProviderService
  ]
})
export class CoreModule {
}
