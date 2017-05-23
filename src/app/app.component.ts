import {Component, DoCheck, OnInit} from '@angular/core';
import {FileType, TreeNode} from 'ng2-file-tree';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'app works!';
  tabs = [];
  fileTree = null;
  addPaneTab() {
    this.tabs.push({
      title: `Dynamic tab ${this.tabs.length + 1}`,
      content: `Content of dynamic tab ${this.tabs.length + 1}`
    });
  }

  clickFileTree(fileNode: TreeNode): void {
    console.log(fileNode);

    console.log(fileNode.getFullPath());
  }

  ngDoCheck(): void {
    console.log('cheeeeeeck');
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
}
