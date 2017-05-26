import {Component, OnInit} from '@angular/core';
import {FileType, TreeNode} from 'ng2-file-tree';
import {Demo} from '../demos';

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
export class Demo1Component implements OnInit {
  panes = [];
  fileTree = null;

  constructor() {
  }

  ngOnInit(): void {
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
