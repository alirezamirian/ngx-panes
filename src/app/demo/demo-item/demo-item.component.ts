import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-demo-item',
  templateUrl: './demo-item.component.html',
  styleUrls: ['./demo-item.component.scss']
})
export class DemoItemComponent implements OnInit {

  @Input() demo;
  @Output() tagClicked = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
