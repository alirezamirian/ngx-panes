import {Component, ContentChild, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PaneHeaderDirective} from '../pane-header.directive';

@Component({
  selector: 'ngx-pane',
  templateUrl: './pane.component.html',
  styleUrls: ['./pane.component.scss']
})
export class PaneComponent implements OnInit {

  @Input() title: string;
  @Input() width: number;
  @Input() resizable = true;
  @Input() id: string;

  @ContentChild(PaneHeaderDirective) header: PaneHeaderDirective;
  @ViewChild('content', {read: TemplateRef}) content;
  constructor() { }

  ngOnInit() {
  }

}
