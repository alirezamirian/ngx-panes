import {AfterViewInit, Component, HostBinding, Optional} from '@angular/core';
import {SideAnchorOwnerDirective} from './side-anchor-owner.directive';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-side-anchor',
  templateUrl: './side-anchor.component.html',
  styleUrls: ['./side-anchor.component.scss']
})
export class SideAnchorComponent implements AfterViewInit {

  @HostBinding('class.target')
  target: boolean;

  constructor(@Optional() public sideAnchorOwner: SideAnchorOwnerDirective,
              private route: ActivatedRoute,
              private location: Location) {
    if (!sideAnchorOwner) {
      throw new Error('SideAnchorComponent is used without any descendant element having an id');
    }

    sideAnchorOwner.activate();
  }

  getPath() {
    return this.location.path(false);
  }

  ngAfterViewInit(): void {
    this.target = this.route.snapshot.fragment === this.sideAnchorOwner.id;
    this.route.fragment.subscribe(fragment => {
      this.target = fragment === this.sideAnchorOwner.id;
    });
  }
}
