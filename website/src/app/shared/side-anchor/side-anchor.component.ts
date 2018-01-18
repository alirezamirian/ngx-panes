import {Component, Optional} from '@angular/core';
import {SideAnchorOwnerDirective} from './side-anchor-owner.directive';
import {Location} from '@angular/common';

@Component({
  selector: 'app-side-anchor',
  templateUrl: './side-anchor.component.html',
  styleUrls: ['./side-anchor.component.scss']
})
export class SideAnchorComponent {

  constructor(@Optional() public sideAnchorOwner: SideAnchorOwnerDirective, private location: Location) {
    if (!sideAnchorOwner) {
      throw new Error('SideAnchorComponent is used without any descendant element having an id');
    }

    sideAnchorOwner.activate();
  }

  getPath() {
    return this.location.path(false);
  }
}
