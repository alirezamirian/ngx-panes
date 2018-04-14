import {Component, OnDestroy, OnInit} from '@angular/core';
import {WithSidenavComponent} from '../with-sidenav/with-sidenav.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {

  constructor(private withSidenav: WithSidenavComponent) {
  }

  ngOnInit() {
    this.withSidenav.hideSidenav();
  }

  ngOnDestroy(): void {
    this.withSidenav.showSidenav();
  }
}
