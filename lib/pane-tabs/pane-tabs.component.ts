import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {PaneComponent} from '../pane/pane.component';
import {Align, RelativeAlign} from '../panes/rtl-utils';

@Component({
  selector: 'pane-tabs',
  templateUrl: './pane-tabs.component.html',
  styleUrls: ['./pane-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaneTabsComponent {

  @Input()
  panes: PaneComponent[];

  @Input()
  selected: PaneComponent;

  @Input()
  direction: 'h' | 'v';

  @Input()
  align: Align;

  @Input()
  relativeAlign: RelativeAlign;

  @Output()
  select = new EventEmitter();

}
