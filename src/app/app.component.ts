import {Component, DoCheck, OnInit} from '@angular/core';
import {FileType, TreeNode} from 'ng2-file-tree';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {

  ngDoCheck(): void {
    console.log('cheeeeeeck');
  }

}
