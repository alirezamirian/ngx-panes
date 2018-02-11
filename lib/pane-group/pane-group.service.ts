import {Injectable} from '@angular/core';
import {PaneComponent} from '../pane/pane.component';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

class PaneGroupOptions {
  defaultWidth: number | null = null;
  toggleable = true;
  autoOpen = true;
}

/**
 * @private
 */
@Injectable()
export class PaneGroupService {

  snapshot: { panes: PaneComponent[], selectedPane: PaneComponent | null } = {panes: [], selectedPane: null};
  private panesSubject = new BehaviorSubject<PaneComponent[]>([]);
  panes$ = this.panesSubject.asObservable();
  private options: PaneGroupOptions = new PaneGroupOptions();
  private selectedPaneSubject = new BehaviorSubject<PaneComponent>(null);
  selectedPane$ = this.selectedPaneSubject.asObservable();

  constructor() {
    this.panes$.subscribe(panes => this.snapshot.panes = panes);
    this.selectedPane$.subscribe(seletedPane => this.snapshot.selectedPane = seletedPane);
    // TODO: should we unsubscribe?!
  }

  add(pane: PaneComponent) {
    if (this.snapshot.panes.indexOf(pane) < 0) {
      this.updatePanes(this.snapshot.panes.concat(pane));
    }
    if (!this.snapshot.selectedPane && this.options.autoOpen) {
      this.select(pane);
    }
  }

  remove(pane: PaneComponent) {
    const index = this.snapshot.panes.indexOf(pane);
    if (index > -1) {
      this.updatePanes(this.snapshot.panes.slice(0, index).concat(this.snapshot.panes.slice(index + 1)));
    }
    if (this.snapshot.selectedPane === pane) {
      this.select(null);
    }
  }


  move(pane: PaneComponent, toIndex: number) {
    const fromIndex = this.snapshot.panes.indexOf(pane);
    if (fromIndex > -1 && fromIndex !== toIndex) {
      const panes = [].concat(this.snapshot.panes); // copy
      panes.splice(toIndex, 0, panes.splice(fromIndex, 1)[0]);
      this.updatePanes(panes);
    }
  }

  select(pane: PaneComponent | null) {
    if (pane !== this.snapshot.selectedPane && (pane === null || this.snapshot.panes.indexOf(pane) > -1)) {
      this.snapshot.selectedPane = pane;
      this.selectedPaneSubject.next(pane);
    }
  }

  toggle(pane: PaneComponent) {
    if (this.snapshot.selectedPane === pane && this.options.toggleable) {
      this.select(null);
    } else if (pane) {
      this.select(pane);
    }
  }

  close() {
    this.select(null);
  }

  // Typescript is aweeeeeesome!
  setOption<Key extends keyof PaneGroupOptions>(option: Key, value: PaneGroupOptions[Key]) {
    this.options[option] = value;
  }

  getOption<Key extends keyof PaneGroupOptions>(option: Key): PaneGroupOptions[Key] {
    return this.options[option];
  }

  private updatePanes(panes: PaneComponent[]) {
    this.panesSubject.next(panes);
  }
}
