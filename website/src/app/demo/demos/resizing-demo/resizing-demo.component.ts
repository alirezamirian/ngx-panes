import {Component, OnInit} from '@angular/core';
import {Demo} from '../demos';

@Demo({
  id: 'resizing',
  title: 'Resizing',
  description: 'Demonstrates options regarding disabling pane resizing',
  order: 3,
  tags: ['Resizing']
})
@Component({
  selector: 'app-resizing-demo',
  templateUrl: './resizing-demo.component.html',
  styleUrls: ['./resizing-demo.component.scss']
})
export class ResizeDisabledDemoComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
