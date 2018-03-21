import {Component, QueryList, ViewChildren} from '@angular/core';
import {Demo} from '../demos';
import {PaneGroupComponent} from '../../../../../../lib/pane-group/pane-group.component';

@Demo({
  id: 'align',
  title: 'Alignment',
  description: 'Demonstrates options regarding pane group alignment inside pane-area',
  order: 1,
  tags: ['Alignment']
})
@Component({
  selector: 'app-align-demo',
  templateUrl: './align-demo.component.html',
  styleUrls: ['./align-demo.component.scss']
})
export class AlignDemoComponent {

  @ViewChildren(PaneGroupComponent)
  paneGroups: QueryList<PaneGroupComponent>;

  // @ViewChild(PaneAreaComponent)
  // paneArea: PaneAreaComponent;
  //
  // aligns = ['top', undefined, 'right', 'bottom'];
  // groups = [true, true, true, true];
  // paneGroupsArray: PaneGroupComponent[] = [];
  // private hasHistory: boolean;
  //
  // constructor(public historyManager: PaneAreaStateManager) {
  // }
  //
  // @HostListener('click')
  // log() {
  //   console.log(this.paneGroups);
  // }
  //
  // ngAfterViewInit() {
  //   this.paneGroupsArray = this.paneGroups.toArray();
  //   this.paneGroups.changes.subscribe(() => this.paneGroupsArray = [
  //     this.paneGroups.find(paneGroup => paneGroup.id === 'paneGroup1'),
  //     this.paneGroups.find(paneGroup => paneGroup.id === 'paneGroup2'),
  //     this.paneGroups.find(paneGroup => paneGroup.id === 'paneGroup3'),
  //     this.paneGroups.find(paneGroup => paneGroup.id === 'paneGroup4'),
  //   ]);
  //   setTimeout(() => {
  //     this.hasHistory = !!this.historyManager.getSavedState(this.paneArea);
  //   });
  // }
  //
  // clearHistory() {
  //   this.historyManager.clearHistory(this.paneArea);
  //   this.hasHistory = false;
  // }
  //
  // identity(a) {
  //   return a;
  // }
  //
  // selectAll(event: MatCheckboxChange) {
  //   this.groups = this.groups.map(() => event.checked);
  // }

}
