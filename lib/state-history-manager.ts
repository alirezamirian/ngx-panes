import {Injectable} from '@angular/core';
import {PaneAreaComponent, PaneAreaState} from './pane-area/pane-area.component';
import {PaneGroupComponent} from './pane-group/pane-group.component';
import {Observable} from 'rxjs/Observable';


export interface Position {
  paneGroup: PaneGroupComponent;
  index: number;
}

export abstract class PaneAreaStateManager {


  abstract getSavedState(paneArea: PaneAreaComponent): PaneAreaState | Promise<PaneAreaState>;

  abstract trackChanges(paneArea: PaneAreaComponent, state$: Observable<PaneAreaState>): void;

  abstract clearHistory(paneArea: PaneAreaComponent): void;
}

@Injectable()
export class LocalStoragePaneAreaStateManager extends PaneAreaStateManager {

  getSavedState(paneArea: PaneAreaComponent): PaneAreaState {
    return JSON.parse(localStorage.getItem(this.getKey(paneArea)));
  }

  clearHistory(paneArea: PaneAreaComponent) {
    localStorage.removeItem(this.getKey(paneArea));
  }

  trackChanges(paneArea: PaneAreaComponent, state$: Observable<PaneAreaState>) {
    state$.subscribe(history => {
      localStorage.setItem(this.getKey(paneArea), JSON.stringify(history));
    });
  }

  private getKey(paneArea: PaneAreaComponent) {
    return `__NGX_PANES_HISTORY_${paneArea.id}`;
  }

}
