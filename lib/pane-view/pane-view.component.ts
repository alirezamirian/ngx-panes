import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'pane-view',
  templateUrl: './pane-view.component.html',
  styleUrls: ['./pane-view.component.scss']
})
export class PaneViewComponent implements OnInit, OnChanges {

  @Input() pane;

  @ViewChild('content', {read: ViewContainerRef})
  private viewContainerRef: ViewContainerRef;

  @ViewChild('header', {read: ViewContainerRef})
  private headerContainerRef: ViewContainerRef;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pane) {
      this.viewContainerRef.clear();
      if (this.pane) {
        this.viewContainerRef.createEmbeddedView(this.pane.content);
        this.headerContainerRef.clear();
        if (this.pane.header) {
          this.headerContainerRef.createEmbeddedView(this.pane.header.templateRef);
        }
      }
    }
  }
}
