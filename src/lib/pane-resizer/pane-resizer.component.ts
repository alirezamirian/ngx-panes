import {Component, HostListener, OnInit} from '@angular/core';
import {PanesComponent} from '../panes/panes.component';

@Component({
  selector: 'ngx-pane-resizer',
  template: '',
  styleUrls: ['./pane-resizer.component.scss']
})
export class PaneResizerComponent implements OnInit {

  private startPos: { x: number, y: number };
  private initialWidth: number;

  constructor(private panes: PanesComponent) {
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
    this.initialWidth = this.panes.getEffectivePaneWidth();
    $event.preventDefault();
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  private onMouseMove(event: MouseEvent) {
    if (this.panes.selectedPane) {
      let movement = 0;
      switch (this.panes.positionMode) {
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
      console.log('movement', movement, this.initialWidth);
      this.panes.selectedPane.width = this.initialWidth + movement;
    }
  }

  private onMouseUp(event: MouseEvent) {
    console.log('mouseup');
    document.removeEventListener('mousemove', this.onMouseMove);
  }
}
