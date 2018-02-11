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
  styleUrls: ['./pane-area.component.scss']
})
export class PaneAreaComponent implements OnInit {

  @ContentChildren(PanesComponent)
  panesComponents: QueryList<PanesComponent>;

  private aligns: Align[] = ['left', 'right', 'bottom', 'top'];

  private left: Side = {selectedPane: null, panes: [], paneGroup: null, subscriptions: []};
  private right: Side = {selectedPane: null, panes: [], paneGroup: null, subscriptions: []};
  private bottom: Side = {selectedPane: null, panes: [], paneGroup: null, subscriptions: []};
  private top: Side = {selectedPane: null, panes: [], paneGroup: null, subscriptions: []};

  constructor() {
  }

  ngOnInit() {
  }

  getAlign(paneGroup) {
    return this.aligns.find(align => this[align].paneGroup === paneGroup) || null;
  }

  addGroup(paneGroup: PaneGroupService, side?: Align) {
    const firstAvailableSide = this.aligns.find(align => !this[align].paneGroup);
    const currentSide = this.aligns.find(align => this[align].paneGroup === paneGroup);

    if (side) {
      // If there is already a pane group in that side, and there are available sides
      if (this[side].paneGroup && (currentSide || firstAvailableSide)) {
        // Move current pane group at this side to first available side
        this.setupSide(this[side].paneGroup, currentSide || firstAvailableSide);
      }
      // Setup this new pane group at the ordered side
      this.setupSide(paneGroup, side);
    } else if (firstAvailableSide) {
      // if side is not specified, setup pane group in first available side.
      this.setupSide(paneGroup, firstAvailableSide);
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
