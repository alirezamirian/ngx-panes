import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss']
})
export class ParamsComponent implements OnInit {

  @Input()
  params: { name: string, type: string, description: string, defaultValue: string }[];

  @Input()
  strings: { name?: string, type?: string, description?: string, defaultValue?: string } = {};

  constructor() {
  }

  ngOnInit() {
  }

}
