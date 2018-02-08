import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Align} from '../utils/rtl-utils';

@Component({
  selector: 'pane-tab',
  templateUrl: './pane-tab.component.html',
  styleUrls: ['./pane-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaneTabComponent implements OnInit {

  @Input()
  active: boolean;

  @Input()
  direction: 'h' | 'v';

  @Input()
  align: Align;

  constructor() {
  }

  ngOnInit() {
  }

}
