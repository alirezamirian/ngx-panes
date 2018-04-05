import {Component, OnInit} from '@angular/core';
import {Guide} from '../../guides';
import {ActivatedRoute, Router} from '@angular/router';
import {PaneAreaComponent} from '../../../../../../lib/pane-area/pane-area.component';
import {MatSnackBar} from '@angular/material';
import {
  CustomPaneAreaStateManager,
  UserPreferencesService
} from './directives/custom-pane-area-state-manager.directive';
import {customStateManagerExample} from '../../../../samples';

@Guide({
  id: 'state-management',
  title: 'State Management',
  description: 'Demonstrates pane area state management. What state is handled and why.'
})
@Component({
  selector: 'app-state-management-guide',
  templateUrl: './state-management-guide.component.html',
  styleUrls: ['./state-management-guide.component.scss'],
  providers: [UserPreferencesService, CustomPaneAreaStateManager]
})
export class StateManagementGuideComponent implements OnInit {

  usageExample =
    `<ngx-pane-area style="height: 265px">
  <ngx-pane-group align="start">
    <ngx-pane title="Pane #1">First Pane</ngx-pane>
    <ngx-pane title="Pane #2">Second Pane</ngx-pane>
  </ngx-pane-group>  
  <ngx-pane-group align="end">
    <ngx-pane title="Pane #3">Third Pane</ngx-pane>
  </ngx-pane-group>  
</ngx-pane-area>`;

  usageExample2 =
    `<ngx-pane-area style="height: 265px" id="state-management-demo" 
                    ngxLocalStorageStateManager>
  <ngx-pane-group align="start" id="group1">
    <ngx-pane title="Pane #1" id="pane1">First Pane</ngx-pane>
    <ngx-pane title="Pane #2" id="pane2">Second Pane</ngx-pane>
  </ngx-pane-group>  
  <ngx-pane-group align="end" id="group2">
    <ngx-pane title="Pane #3" id="pane3">Third Pane</ngx-pane>
  </ngx-pane-group>  
</ngx-pane-area>`;

  sources = {
    customStateManager: customStateManagerExample,
    provider:
      `providers: [{provide: PaneAreaStateManager, useClass: CustomPaneAreaStateManager}]`
  };
  private sizes: (number | undefined)[];
  private positionChanged = false;
  private sizeChanged = false;

  constructor(private route: ActivatedRoute, private router: Router, private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.sizes = [
        parseInt(params.w1, 10) || undefined,
        parseInt(params.w2, 10) || undefined,
        parseInt(params.w3, 10) || undefined,
      ];
      this.sizeChanged = this.sizes.some(i => !!i);
    });
  }

  check(paneArea: PaneAreaComponent) {
    if (paneArea.left.paneGroup.panes.length === 3 && !this.positionChanged) {
      this.positionChanged = true;
      this.showSnackbar('Nice! Now refresh the page to see it\'s still on the left side');
    }
  }

  setSize(index, size, notify) {
    if (!this.sizeChanged && notify) {
      this.sizeChanged = true;
      this.showSnackbar(`Nice! Now refresh the page to see size will remain ${size} pixels`);
    }
    this.router.navigate(['.'], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        [`s${index + 1}`]: size
      }
    });
  }

  private showSnackbar(message: string) {
    this.snackbar.open(message, 'Refresh', {duration: 5000, horizontalPosition: 'end'}).onAction().subscribe(() => {
      document.location.reload();
    });
  }
}
