import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'ngx-pane-view',
  template: '<ng-container #container></ng-container>'
})
export class PaneViewComponent implements OnInit, OnChanges {

  @Input() pane;

  @ViewChild('container', {read: ViewContainerRef})
  private viewContainerRef: ViewContainerRef;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pane) {
      this.viewContainerRef.clear();
      if (this.pane) {
        this.viewContainerRef.createEmbeddedView(this.pane.content);
      }
    }
  }
}
