import {Component, OnInit} from '@angular/core';
import {Demo} from '../demos';

@Demo({
  id: 'resize-disabled',
  title: 'Resizable Disabled',
  description: 'Demonstrates options regarding disabling pane resizing',
  tags: ['Resizing']
})
@Component({
  selector: 'app-resize-disabled-demo',
  templateUrl: './resize-disabled-demo.component.html',
  styleUrls: ['./resize-disabled-demo.component.scss']
})
export class ResizeDisabledDemoComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
