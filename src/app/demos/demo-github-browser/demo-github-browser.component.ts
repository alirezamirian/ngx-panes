import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, NgZone} from '@angular/core';
import {FileType, TreeNode} from 'ng2-file-tree';
import * as CodeMirror from 'codemirror';
import {Demo} from '../demos';
import {Http} from '@angular/http';
@Demo({
  id: 'github-browser',
  title: 'First Demo',
  tags: ['Dynamic']
})
@Component({
  selector: 'ngx-demo-1',
  templateUrl: './demo-github-browser.component.html',
  styleUrls: ['./demo-github-browser.component.scss']
})
export class DemoGithubBrowserComponent implements OnInit, AfterViewInit {
  loading = false;
  _code = '';
  cm: any;

  panes = [];

  set code(value) {
    if (this.cm) {
      this.cm.getDoc().setValue(value);
    } else {
      this._code = value;
    }
  };

  get code() {
    return this._code;
  }

  @ViewChild('code') codeEl: ElementRef;

  constructor(private http: Http, private zone: NgZone) {
  }

  ngOnInit(): void {

    this.http.get('/app/demos/demo-github-browser/demo-github-browser.component.ts')
      .subscribe(res => this.code = res.text());
  }

  ngAfterViewInit(): void {
    // TODO: check for codemirror-related cleanup in ngDestroy
    this.zone.runOutsideAngular(() => {
      this.cm = new CodeMirror(this.codeEl.nativeElement, {
        value: this.code,
        mode: {
          name: 'javascript',
          typescript: true
        },
        lineNumbers: true,
      });
    });
  }

  downloadSrc(githubFileDto) {
    this.loading = true;
    this.http.get(githubFileDto.download_url).subscribe(res => {
      this.code = res.text();
      this.loading = false;
      setTimeout(() => this.cm.refresh());
    });
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

