import {Component, HostListener, NgZone, OnInit} from '@angular/core';
import {PanesComponent} from '../panes/panes.component';

@Component({
  selector: 'ngx-pane-resizer',
  template: '',
  styleUrls: ['./pane-resizer.component.scss']
})
export class PaneResizerComponent implements OnInit {

  private startPos: { x: number, y: number };
  private initialWidth: number;
  private _lastSize: number;

  constructor(private panes: PanesComponent, private zone: NgZone) {
  }

  ngOnInit() {
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  @HostListener('mousedown', ['$event'])
  private onMouseDown($event: MouseEvent) {
    if (!this.panes.selectedPane) {
      return;
    }
    this.startPos = {
      x: $event.pageX,
      y: $event.pageY
    };
    this.initialWidth = this.panes.paneView.getWidth();
    $event.preventDefault();
    this.zone.runOutsideAngular(() => {
      document.addEventListener('mousemove', this.onMouseMove);
    });

    document.addEventListener('mouseup', this.onMouseUp, <any>{once: true} /*is it cross-browser?*/);
  }

  private onMouseMove(event: MouseEvent) {
    if (this.panes.selectedPane) {
      let movement = 0;
      switch (this.panes.align) {
        case 'left':
          movement = event.pageX - this.startPos.x;
          break;
        case 'right':
          movement = this.startPos.x - event.pageX;
          break;
        case 'top':
          movement = event.pageY - this.startPos.y;
          break;
        case 'bottom':
          movement = this.startPos.y - event.pageY;
          break;
      }
      this._lastSize = this.initialWidth + movement;
      this.panes.directResize(this._lastSize);
    }
  }

  private onMouseUp(event: MouseEvent) {
    this.panes.selectedPane.width = this._lastSize;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
}
