import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FabExpandableComponent} from './fab-expandable/fab-expandable.component';
import {MatButtonModule, MatIconModule, MatTooltipModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
    MatTooltipModule
  ],
  declarations: [FabExpandableComponent],
  exports: [FabExpandableComponent]
})
export class FabExpandableModule {
}
