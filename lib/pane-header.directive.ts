/**
 * Created by alireza on 5/26/17.
 */


import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: '[ngxPaneHeader]'})
export class PaneHeaderDirective {
  constructor(public templateRef: TemplateRef<any>) {
  }
}
