import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, NgZone} from '@angular/core';
import {FileType, TreeNode} from 'ng2-file-tree';
import * as CodeMirror from 'codemirror';
import {Demo} from '../demos';
import {Http} from '@angular/http';
@Demo({
  id: '1',
  title: 'First Demo',
  tags: ['Dynamic']
})
@Component({
  selector: 'ngx-demo-1',
  templateUrl: './demo-1.component.html',
  styleUrls: ['./demo-1.component.scss']
})
export class Demo1Component implements OnInit, AfterViewInit {
  _code = '';
  cm: any;

  panes = [];
  fileTree = null;

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

  constructor(private zone: NgZone, private http: Http) {
  }

  ngOnInit(): void {
    this.http.get('/app/demos/demo-1/demo-1.component.ts')
      .subscribe(res => this.code = res.text());

    setTimeout(() => { // setTimeout is for a bug in ng2-file-tree
      this.fileTree = new TreeNode({
        'name': 'photos',
        'type': FileType.dir,
        'children': [
          {
            'name': 'summer',
            type: FileType.dir,
            'children': [
              {
                'name': 'june',
                type: FileType.dir,
                'children': [
                  {
                    'name': 'windsurf.jpg',
                    type: FileType.file,
                    children: null
                  }]
              }
            ]
          }
        ]
      });
    });
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

  addPane() {
    this.panes.push({
      title: `Dynamic tab ${this.panes.length + 1}`,
      content: `Content of dynamic tab ${this.panes.length + 1}`
    });
  }

  removePane(pane) {
    this.panes.splice(this.panes.indexOf(pane), 1);
  }

  clickFileTree(fileNode: TreeNode): void {
    console.log(fileNode);
    console.log(fileNode.getFullPath());
  }

}
