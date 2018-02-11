import {Component, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Demo} from '../demos';
import {PaneGroupDirective} from '../../../../../../lib/pane-group/pane-group.component';

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

  @ViewChildren(PaneGroupDirective)
  paneGroups: QueryList<PaneGroupDirective>;
  aligns = ['top', undefined, 'right', undefined];

  constructor() {
  }

  @HostListener('click')
  log() {
    console.log(this.paneGroups.map(paneGroup => paneGroup.align));
  }

  ngOnInit() {
  }

}
