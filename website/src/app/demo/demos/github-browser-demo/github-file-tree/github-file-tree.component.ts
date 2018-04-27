import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FileType, TreeNode} from 'ng2-file-tree';
import {HttpClient} from '@angular/common/http';
import {Github} from '../github-api-models';
import GithubContent = Github.GithubContent;

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
  fileSelected = new EventEmitter<GithubContent>();
  @Output()
  fileOpened = new EventEmitter<GithubContent>();

  @Input()
  autoSelectReadme = true;

  constructor(private httpClient: HttpClient) {
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
    const url = `https://api.github.com/repos/${this.slug}/contents${parentNode.getFullPath()}`;
    this.httpClient.get<GithubContent[]>(url, {
      params: {
        ref: this.ref
      }
    })
      .subscribe((files: GithubContent[]) => {
        parentNode.children = files.map(
          data => githubContentNodeToTreeNode(parentNode, data)
        );
        parentNode.children.forEach(treeNode => {
          treeNode.fold();
          treeNode.parent = parentNode;
        });
        parentNode.loaded = true;
        files.some(file => {
          if (file.name.toLowerCase() === 'readme.md') {
            this.fileSelected.emit(file);
            return true;
          }
        });
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
