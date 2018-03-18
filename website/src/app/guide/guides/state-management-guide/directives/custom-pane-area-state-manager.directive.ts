import {Directive, Injectable} from '@angular/core';
import {PaneAreaStateManager} from '../../../../../../../lib/pane-area-state-manager';
import {PaneAreaComponent, PaneAreaState} from '../../../../../../../lib/pane-area/pane-area.component';
import {Observable} from 'rxjs/Observable';


let globalState = null;

@Injectable()
export class UserPreferencesService {

  getPaneAreaState(): Promise<PaneAreaState> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(globalState);
      }, 1000);
    });
  }

  setPaneAreaState(state: PaneAreaState) {
    globalState = state;
  }

  clearPaneAreaState() {
    globalState = null;
  }
}

@Injectable()
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

}

@Directive({
  selector: '[myCustomPaneAreaStateManager]',
  providers: [{provide: PaneAreaStateManager, useClass: CustomPaneAreaStateManager}]
})
export class CustomPaneAreaStateManagerDirective {

  constructor() {
  }

}
