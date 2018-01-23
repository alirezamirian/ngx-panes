import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'ngx-pane-header',
  templateUrl: './pane-header.component.html',
  styleUrls: ['./pane-header.component.scss']
})
export class PaneHeaderComponent implements OnInit {

  @ViewChild('content')
  public templateRef: TemplateRef<any>;

  constructor() {
  }

  ngOnInit() {
  }

}
