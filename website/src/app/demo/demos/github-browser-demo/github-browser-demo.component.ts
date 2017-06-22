import {Component, OnInit} from '@angular/core';
import {Demo} from '../demos';

@Demo({
  id: 'github-browser',
  title: 'Github Browser',
  description: 'A small application of ngx-panes for browsing a github repo content',
  tags: ['Basic Usage', 'Resizing']
})
@Component({
  selector: 'app-github-browser-demo',
  templateUrl: './github-browser-demo.component.html',
  styleUrls: [
    '../../shared-demo-styles.scss',
    './github-browser-demo.component.scss'
  ]
})
export class GithubBrowserDemoComponent implements OnInit {
  sourceUrl = '/app/demo/demos/github-browser-demo/github-browser-demo.component.ts';
  slug = 'angular/angular';

  panes = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  setSourceUrl(githubFileDto) {
    this.sourceUrl = githubFileDto.download_url;
  }

  addPane() {
    this.panes.push({
      title: `Dynamic tab ${this.panes.length + 1}`,
      content: `Content of dynamic tab ${this.panes.length + 1}`
    });
  }

  removePane(pane) {
    this.panes.splice(this.panes.indexOf(pane), 1);
  }
}

