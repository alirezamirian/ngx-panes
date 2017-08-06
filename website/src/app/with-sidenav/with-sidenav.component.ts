import {Component, OnInit} from '@angular/core';
import {GuideModel, guides} from '../guide/guides';
// workaround for importing all guides
import '../guide/guides/index';


@Component({
  selector: 'app-with-sidenav',
  templateUrl: './with-sidenav.component.html',
  styleUrls: ['./with-sidenav.component.scss']
})
export class WithSidenavComponent implements OnInit {
  guides: GuideModel[];

  constructor() {
  }

  ngOnInit() {
    this.guides = guides;
  }

}
