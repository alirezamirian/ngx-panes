import {Component, OnInit} from '@angular/core';
import {Guide} from '../../guides';

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

  constructor() {
  }

  ngOnInit() {
  }

}
