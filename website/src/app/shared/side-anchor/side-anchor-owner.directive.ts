import {Directive, ElementRef, HostBinding} from '@angular/core';

// noinspection TsLint
@Directive({
  selector: '[id],[sideAnchorOwner]'
})
export class SideAnchorOwnerDirective {

  @HostBinding('style.position')
  position: string;

  constructor(private elRef: ElementRef) {
  }

  get id() {
    return this.elRef.nativeElement.id;
  }

  activate() {
    this.position = 'relative';
  };

}
