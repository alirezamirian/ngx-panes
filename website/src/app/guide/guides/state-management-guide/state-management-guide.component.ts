import {Component, OnInit} from '@angular/core';
import {Guide} from '../../guides';
import {ActivatedRoute, Router} from '@angular/router';
import {PaneAreaComponent} from '../../../../../../lib/pane-area/pane-area.component';
import {MatSnackBar} from '@angular/material';
import {
  CustomPaneAreaStateManager,
  UserPreferencesService
} from './directives/custom-pane-area-state-manager.directive';

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

  sources = {
    customStateManager:
      `@Injectable()
export class CustomPaneAreaStateManager extends PaneAreaStateManager {
  constructor(private userPreferencesService: UserPreferencesService) {
    super();
  }

  getSavedState(paneArea: PaneAreaComponent): Promise<PaneAreaState> {
    return this.userPreferencesService.getPaneAreaState();
  }

  trackChanges(paneArea: PaneAreaComponent, state$: Observable<PaneAreaState>): void {
    state$.subscribe(state => {
      this.userPreferencesService.setPaneAreaState(state);
    });
  }

  clearHistory(paneArea: PaneAreaComponent): void {
    this.userPreferencesService.clearPaneAreaState();
  }
}`,
    provider:
      `providers: [{provide: PaneAreaStateManager, useClass: CustomPaneAreaStateManager}]`
  };
  private widths: (number | undefined)[];
  private positionChanged = false;
  private widthChanged = false;

  constructor(private route: ActivatedRoute, private router: Router, private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.widths = [
        parseInt(params.w1, 10) || undefined,
        parseInt(params.w2, 10) || undefined,
        parseInt(params.w3, 10) || undefined,
      ];
      this.widthChanged = this.widths.some(i => !!i);
    });
  }

  check(paneArea: PaneAreaComponent) {
    if (paneArea.left.paneGroup.panes.length === 3 && !this.positionChanged) {
      this.positionChanged = true;
      this.showSnackbar('Nice! Now refresh the page to see it\'s still on the left side');
    }
  }

  setWidth(index, width, notify) {
    if (!this.widthChanged && notify) {
      this.widthChanged = true;
      this.showSnackbar(`Nice! Now refresh the page to see width will remain ${width} pixels`);
    }
    this.router.navigate(['.'], {
      replaceUrl: true,
      relativeTo: this.route,
      queryParamsHandling: 'merge',
      queryParams: {
        [`w${index + 1}`]: width
      }
    });
  }

  private showSnackbar(message: string) {
    this.snackbar.open(message, 'Refresh', {duration: 5000, horizontalPosition: 'end'}).onAction().subscribe(() => {
      document.location.reload();
    });
  }
}
