import {Component, OnInit} from '@angular/core';
import {Guide} from '../../guides';

@Guide({
  id: 'state-management',
  title: 'State Management',
  description: 'Demonstrates pane area state management. What state is handled and why.'
})
@Component({
  selector: 'app-state-management-guide',
  templateUrl: './state-management-guide.component.html',
  styleUrls: ['./state-management-guide.component.scss']
})
export class StateManagementGuideComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
