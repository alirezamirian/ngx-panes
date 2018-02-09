import {Injectable} from '@angular/core';
import {PaneComponent} from '../pane/pane.component';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

/**
 * @private
 */
@Injectable()
export class PaneGroupService {

  private panes: PaneComponent[] = [];
  private panesSubject = new BehaviorSubject<PaneComponent[]>(this.panes);
  public panes$ = this.panesSubject.asObservable();
  private selectedPane = null;
  private selectedPaneSubject = new BehaviorSubject<PaneComponent>(this.selectedPane);
  public selectedPane$ = this.selectedPaneSubject.asObservable();

  constructor() {
  }

  add(pane: PaneComponent) {
    if (this.panes.indexOf(pane) < 0) {
      this.updatePanes(this.panes.concat(pane));
    }
  }

  remove(pane: PaneComponent) {
    const index = this.panes.indexOf(pane);
    if (index > -1) {
      this.updatePanes(this.panes.slice(0, index).concat(this.panes.slice(index + 1)));
    }
    if (this.selectedPane === pane) {
      this.select(null);
    }
  }


  move(pane: PaneComponent, toIndex: number) {
    const fromIndex = this.panes.indexOf(pane);
    if (fromIndex > -1 && fromIndex !== toIndex) {
      const panes = [].concat(this.panes); // copy
      panes.splice(toIndex, 0, panes.splice(fromIndex, 1)[0]);
      this.updatePanes(panes);
    }
  }

  select(pane: PaneComponent | null) {
    if (pane !== this.selectedPane && (pane === null || this.panes.indexOf(pane) > -1)) {
      this.selectedPane = pane;
      this.selectedPaneSubject.next(pane);
    }
  }

  close() {
    this.select(null);
  }

  private updatePanes(panes: PaneComponent[]) {
    this.panes = panes;
    this.panesSubject.next(this.panes);
  }

}
