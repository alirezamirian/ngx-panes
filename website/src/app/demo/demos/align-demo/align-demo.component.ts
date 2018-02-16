import {Component, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Demo} from '../demos';
import {PaneGroupComponent} from '../../../../../../lib/pane-group/pane-group.component';
import {MatCheckboxChange} from '@angular/material';

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
export class AlignDemoComponent implements OnInit {

  @ViewChildren(PaneGroupComponent)
  paneGroups: QueryList<PaneGroupComponent>;
  aligns = ['top', undefined, 'right', 'bottom'];
  removed = false;
  groups = [true, true, true, true];

  constructor() {
    // setInterval(() => {
    //   this.removed = !this.removed;
    // }, 3000);
  }

  @HostListener('click')
  log() {
    console.log(this.paneGroups.map(paneGroup => paneGroup.align));
  }

  ngOnInit() {
  }

  identity(a) {
    return a;
  }

  selectAll(event: MatCheckboxChange) {
    this.groups = this.groups.map(() => event.checked);
  }

}
