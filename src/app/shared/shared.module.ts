import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExternalLinksModule} from './external-links.module';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    ExternalLinksModule
  ]
})
export class SharedModule {
}
