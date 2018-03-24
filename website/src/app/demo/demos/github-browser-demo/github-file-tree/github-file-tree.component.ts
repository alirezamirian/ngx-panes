import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FileType, TreeNode} from 'ng2-file-tree';
import {Http} from '@angular/http';

@Component({
  selector: 'app-github-file-tree',
  templateUrl: './github-file-tree.component.html',
  styleUrls: ['./github-file-tree.component.scss']
})
export class GithubFileTreeComponent implements OnInit, OnChanges {

  fileTree = null;

  @Input()
  slug: string;

  @Input()
  ref: string;

  @Output()
  fileSelected = new EventEmitter();
  @Output()
  fileOpened = new EventEmitter();

  constructor(private http: Http) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.slug || changes.ref) && this.slug) {
      if (!this.fileTree) {
        setTimeout(() => { // due to buggy behaviour of ng-file-tree
          this.fileTree = new TreeNode({
            name: '/',
            type: FileType.dir,
            children: []
          });
          this.loadFileTree(this.fileTree);
        });
      } else {
        this.loadFileTree(this.fileTree);
      }
    }
  }

  clickFileTree(treeNode: TreeNode): void {
    if (treeNode.isDir()) {
      if (!treeNode.isExpanded()) {
        treeNode.expand();
        if (!treeNode['loaded']) {
          this.loadFileTree(treeNode);
        }
      } else {
        treeNode.fold();
      }
    } else {
      this.fileSelected.emit(treeNode['data']);
    }
  }

  loadFileTree(parentNode) {
    this.http.get(`https://api.github.com/repos/${this.slug}/contents${parentNode.getFullPath()}`, {
      params: {
        ref: this.ref
      }
    })
      .subscribe(res => {
        parentNode.children = res.json().map(
          data => githubContentNodeToTreeNode(parentNode, data)
        );
        parentNode.children.forEach(treeNode => {
          treeNode.fold();
          treeNode.parent = parentNode;
        });
        parentNode.loaded = true;
      });
  }
}
function githubContentNodeToTreeNode(parentNode: TreeNode, contentNode) {
  const treeNode = new TreeNode({
    name: contentNode.name,
    type: contentNode.type === 'dir' ? FileType.dir : FileType.file,
    children: null
  }, parentNode);
  treeNode['data'] = contentNode;
  return treeNode;
}
