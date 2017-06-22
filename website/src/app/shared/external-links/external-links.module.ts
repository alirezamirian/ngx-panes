import {Directive, ElementRef, NgModule, OnInit, Optional, Renderer2} from '@angular/core';

@Directive({
  selector: '[externalLinks]'
})
export class ExternalLinksContainerDirective {
  constructor() {
  }
}
@Directive({
  selector: 'a'
})
export class ExternalLinksDirective implements OnInit {

  constructor(@Optional() private externalLink: ExternalLinksContainerDirective,
              private el: ElementRef,
              private renderer: Renderer2) {
  }

  ngOnInit(): void {
    if (this.externalLink) {
      this.renderer.setAttribute(this.el.nativeElement, 'target', '_blank');
    }
  }
}

@NgModule({
  declarations: [
    ExternalLinksContainerDirective,
    ExternalLinksDirective
  ],
  exports: [
    ExternalLinksContainerDirective,
    ExternalLinksDirective
  ]
})
export class ExternalLinksModule {
}
