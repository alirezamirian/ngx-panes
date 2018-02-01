import {Component, OnInit} from '@angular/core';
import {Demo} from '../demos';

@Demo({
  id: 'align',
  title: 'Pane alignment',
  description: 'Demonstrates options regarding pane alignment',
  tags: ['Alignment']
})
@Component({
  selector: 'app-align-demo',
  templateUrl: './align-demo.component.html',
  styleUrls: ['./align-demo.component.scss']
})
export class AlignDemoComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
