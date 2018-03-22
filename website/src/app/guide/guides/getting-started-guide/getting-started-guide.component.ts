import {Component, OnInit} from '@angular/core';
import {Guide} from '../../guides';
import {ApiDocsService} from '../../../core/api-docs.service';

@Guide({
  id: 'getting-started',
  order: 1,
  title: 'Getting Started',
  description: 'Getting Started with ngx-panes'
})
@Component({
  selector: 'app-getting-started-guide',
  templateUrl: './getting-started-guide.component.html',
  styleUrls: ['./getting-started-guide.component.scss']
})
export class GettingStartedGuideComponent implements OnInit {

  importCode: string;
  templateCode =
    `<ngx-pane-area style="height: 300px">
  <ngx-pane-group align="start" [defaultWidth]="200">
    <ngx-pane title="pane #1">First pane</ngx-pane>
    <ngx-pane title="pane #2">Second pane</ngx-pane>
  </ngx-pane-group>
  <ngx-pane-group align="end" [defaultWidth]="200">
    <ngx-pane title="pane #3">Third pane</ngx-pane>
    <ngx-pane title="pane #4">Forth pane</ngx-pane>
  </ngx-pane-group>
  <div>
    Main content
  </div>
</ngx-pane-area>`;

  constructor(private apiDocsService: ApiDocsService) {
  }

  ngOnInit() {
    this.apiDocsService.getDocItem('NgxPanesModule').then(docs => {
      this.importCode = docs[0].usage;
    });
  }

}
