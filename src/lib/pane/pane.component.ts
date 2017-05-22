import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';

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

  @ViewChild('content', {read: TemplateRef}) content;
  constructor() { }

  ngOnInit() {
  }

}
