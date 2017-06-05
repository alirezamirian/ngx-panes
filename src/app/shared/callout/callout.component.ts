import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-callout',
  templateUrl: './callout.component.html',
  styleUrls: ['./callout.component.scss']
})
export class CalloutComponent implements OnInit {
  public static typeToIconMap = {
    danger: 'warning',
    info: 'info',
    success: 'check',
    'default': 'info'
  };
  _icon: string;

  @Input() type: 'danger' | 'info' | 'success';

  @Input() set icon(value: string) {
    this._icon = value;
  }

  get icon() {
    if (this._icon) {
      return this._icon;
    }
    return CalloutComponent.typeToIconMap[this.type || 'default'];
  }

  constructor() {
  }

  ngOnInit() {
  }

}
