import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-demo-content',
  templateUrl: './demo-content.component.html',
  styleUrls: ['./demo-content.component.scss']
})
export class DemoContentComponent implements OnInit {
  public _lines: Array<any> = [];

  @Input()
  public set lines(value: number){
    this._lines.length = value;
  };

  constructor() {
    this.lines = 10;
  }

  ngOnInit() {
  }

}
