import {Component, ContentChildren, OnInit, QueryList} from '@angular/core';
import {PaneGroupService} from '../pane-group/pane-group.service';
import {PaneComponent} from '../pane/pane.component';
import {PanesComponent} from '../panes/panes.component';
import {Align} from '../utils/rtl-utils';
import {Subscription} from 'rxjs/Subscription';


interface Side {
  paneGroup: PaneGroupService;
  selectedPane: PaneComponent | null;
  panes: PaneComponent[];
  subscriptions: Subscription[];
}

@Component({
  selector: 'ngx-pane-area',
  templateUrl: './pane-area.component.html',
  styleUrls: ['./pane-area.component.scss'],
})
export class PaneAreaComponent implements OnInit {

  @ContentChildren(PanesComponent)
  panesComponents: QueryList<PanesComponent>;

  private left: Side = {selectedPane: null, panes: [], paneGroup: null, subscriptions: []};
  private right: Side = {selectedPane: null, panes: [], paneGroup: null, subscriptions: []};
  private bottom: Side = {selectedPane: null, panes: [], paneGroup: null, subscriptions: []};
  private top: Side = {selectedPane: null, panes: [], paneGroup: null, subscriptions: []};

  constructor() {
  }

  ngOnInit() {
  }

  addGroup(paneGroup: PaneGroupService, side?: Align) {
    const aligns: Align[] = ['left', 'right', 'bottom', 'top'];
    side = side || aligns.find(align => !this[align] || !this[align].paneGroup);
    if (side) {
      this.setupSide(paneGroup, side);
    }
  }

  private setupSide(paneGroup: PaneGroupService, side: Align) {
    if (this[side]) {
      this[side].subscriptions.forEach(subscription => subscription.unsubscribe());
    }
    this[side] = {
      paneGroup: paneGroup,
      panes: [],
      selectedPane: null,
      subscriptions: [
        paneGroup.panes$.subscribe(panes => this[side].panes = panes),
        paneGroup.selectedPane$.subscribe(selectedPane => this[side].selectedPane = selectedPane),
      ]
    };
  }
}
