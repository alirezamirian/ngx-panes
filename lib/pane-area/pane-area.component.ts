import {Component, OnInit} from '@angular/core';
import {PaneGroupService} from '../pane-group/pane-group.service';
import {PaneComponent} from '../pane/pane.component';
import {Align} from '../utils/rtl-utils';
import {Subscription} from 'rxjs/Subscription';
import {PaneGroupComponent} from '../pane-group/pane-group.component';


interface Side {
  paneGroup: PaneGroupService;
  selectedPane: PaneComponent | null;
  panes: PaneComponent[];
  subscriptions: Subscription[];
}

/**
 * Defines an area consisted of a centered main content surrounded by
 * up to 4 side pane groups (aka tool windows).
 *
 * Valid children of a ngx-pane-area are:
 * - {@link PaneGroupComponent ngx-pane-group}: defines side pane groups
 * - {@link PaneAreaContent ngx-pane-area-content}: defines main content
 *
 * @usage
 * <ngx-pane-area>
 *   <ngx-pane-group> ... </ngx-pane-group>
 *   <ngx-pane-group> ... </ngx-pane-group>
 *   <ngx-pane-area-content> ... </ngx-pane-area-content>
 * </ngx-pane-area>
 */
@Component({
  selector: 'ngx-pane-area',
  templateUrl: './pane-area.component.html',
  styleUrls: ['./pane-area.component.scss']
})
export class PaneAreaComponent implements OnInit {

  private aligns: Align[] = ['left', 'right', 'bottom', 'top'];

  private left: Side = {selectedPane: null, panes: [], paneGroup: null, subscriptions: []};
  private right: Side = {selectedPane: null, panes: [], paneGroup: null, subscriptions: []};
  private bottom: Side = {selectedPane: null, panes: [], paneGroup: null, subscriptions: []};
  private top: Side = {selectedPane: null, panes: [], paneGroup: null, subscriptions: []};

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Returns align value of the input paneGroup, or null if pane group doesn't exist in this pane area.
   * @param paneGroup
   * @returns {(Align | undefined) & null}
   */
  getAlign(paneGroup: PaneGroupComponent): Align | null {
    return this.aligns.find(align => this[align].paneGroup === paneGroup.paneGroup) || null;
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
