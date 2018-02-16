import {Injectable} from '@angular/core';
import {PaneAreaComponent, PaneHistory} from './pane-area/pane-area.component';
import {PaneGroupComponent} from './pane-group/pane-group.component';
import {Observable} from 'rxjs/Observable';


export interface Position {
  paneGroup: PaneGroupComponent;
  index: number;
}

export abstract class PaneAreaStateManager {


  abstract getHistory(paneArea: PaneAreaComponent): PaneHistory;

  abstract trackChanges(paneArea: PaneAreaComponent, history$: Observable<PaneHistory>);

  abstract clearHistory(paneArea: PaneAreaComponent);
}

@Injectable()
export class LocalStoragePaneAreaStateManager extends PaneAreaStateManager {

  getHistory(paneArea: PaneAreaComponent): PaneHistory {
    return JSON.parse(localStorage.getItem(this.getKey(paneArea)));
  }

  clearHistory(paneArea: PaneAreaComponent) {
    localStorage.removeItem(this.getKey(paneArea));
  }

  trackChanges(paneArea: PaneAreaComponent, history$: Observable<PaneHistory>) {
    history$.subscribe(history => {
      localStorage.setItem(this.getKey(paneArea), JSON.stringify(history));
    });
  }

  private getKey(paneArea: PaneAreaComponent) {
    return `__NGX_PANES_HISTORY_${paneArea.id}`;
  }

}
