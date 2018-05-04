import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

interface Param {
  name: string;
  type: string;
  description: string;
  defaultValue: string;
}

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss']
})
export class ParamsComponent implements OnInit, OnChanges {

  @Input()
  exclude: string[] = [];

  @Input()
  params: Param[];

  @Input()
  strings: Partial<Param> = {};
  private keys: any & {};

  @Input()
  anchorPrefix: string;


  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.params && this.params) {
      this.keys = ['name', 'type', 'description', 'defaultValue'].filter(
        key => this.params.some(param => param[key] != null)
      ).reduce((soFar, key) => Object.assign(soFar, {[key]: true}), {});
      console.log('this.keys', this.keys);
    }
  }
}
