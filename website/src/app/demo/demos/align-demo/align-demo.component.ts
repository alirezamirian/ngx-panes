import {AfterViewInit, Component, HostListener, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Demo} from '../demos';
import {PaneGroupComponent} from '../../../../../../lib/pane-group/pane-group.component';
import {MatCheckboxChange} from '@angular/material';
import {PaneAreaStateManager} from '../../../../../../lib/state-history-manager';
import {PaneAreaComponent} from '../../../../../../lib/pane-area/pane-area.component';

@Demo({
  id: 'align',
  title: 'Alignment',
  description: 'Demonstrates options regarding pane group alignment inside pane-area',
  tags: ['Alignment']
})
@Component({
  selector: 'app-align-demo',
  templateUrl: './align-demo.component.html',
  styleUrls: ['./align-demo.component.scss']
})
export class AlignDemoComponent implements AfterViewInit {

  @ViewChildren(PaneGroupComponent)
  paneGroups: QueryList<PaneGroupComponent>;

  @ViewChild(PaneAreaComponent)
  paneArea: PaneAreaComponent;

  aligns = ['top', undefined, 'right', 'bottom'];
  removed = false;
  groups = [true, true, true, true];
  private hasHistory: boolean;

  constructor(public historyManager: PaneAreaStateManager) {
    setInterval(() => {
      this.removed = !this.removed;
    }, 3000);
  }

  @HostListener('click')
  log() {
    console.log(this.paneGroups.map(paneGroup => paneGroup.align));
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.hasHistory = !!this.historyManager.getHistory(this.paneArea);
    });
  }

  clearHistory() {
    this.historyManager.clearHistory(this.paneArea);
    this.hasHistory = false;
  }

  identity(a) {
    return a;
  }

  selectAll(event: MatCheckboxChange) {
    this.groups = this.groups.map(() => event.checked);
  }

}
