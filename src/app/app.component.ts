import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
  tabs = [];
  addPaneTab() {
    this.tabs.push({
      title: `Dynamic tab ${this.tabs.length + 1}`,
      content: `Content of dynamic tab ${this.tabs.length + 1}`
    });
  }
}
