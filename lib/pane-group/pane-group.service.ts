// import {Injectable} from '@angular/core';
// import {PaneComponent} from '../pane/pane.component';
// import {BehaviorSubject} from 'rxjs/BehaviorSubject';
//
// /**
//  * @private
//  */
// @Injectable()
// export class PaneGroupService {
//
//   snapshot: { panes: PaneComponent[], selectedPane: PaneComponent | null } = {panes: [], selectedPane: null};
//   private panesSubject = new BehaviorSubject<PaneComponent[]>([]);
//   panes$ = this.panesSubject.asObservable();
//   private selectedPaneSubject = new BehaviorSubject<PaneComponent>(null);
//   selectedPane$ = this.selectedPaneSubject.asObservable();
//
//   constructor() {
//     this.panes$.subscribe(panes => this.snapshot.panes = panes);
//     this.selectedPane$.subscribe(seletedPane => this.snapshot.selectedPane = seletedPane);
//     // TODO: should we unsubscribe?!
//   }
//
//   reset(panes: PaneComponent[]) {
//     this.updatePanes(panes);
//     panes.forEach(pane => {
//       pane.paneGroup = this;
//     });
//
//     let paneToSelect = panes.find(pane => this.snapshot.selectedPane === pane) || null;
//     // if pane group is already open, but previously selected pane no longer exist,
//     // and new pane collection is not empty, select the last pane
//     if (this.snapshot.selectedPane && !paneToSelect && panes.length > 0) {
//       paneToSelect = panes[panes.length - 1];
//     }
//     this.select(paneToSelect);
//   }
//
//   add(pane: PaneComponent, index?: number) {
//     const panes = this.snapshot.panes;
//     if (index === undefined) {
//       index = panes.length;
//     }
//     if (panes.indexOf(pane) < 0) {
//       this.updatePanes(panes.slice(0, index).concat(pane).concat(panes.slice(index)));
//       pane.paneGroup = this; // necessary for moving across pane groups
//     }
//   }
//
//   remove(pane: PaneComponent) {
//     const index = this.snapshot.panes.indexOf(pane);
//     if (index > -1) {
//       this.updatePanes(this.snapshot.panes.slice(0, index).concat(this.snapshot.panes.slice(index + 1)));
//     }
//     if (this.snapshot.selectedPane === pane) {
//       this.select(null);
//     }
//   }
//
//
//   move(pane: PaneComponent, toIndex: number) {
//     const fromIndex = this.snapshot.panes.indexOf(pane);
//     if (fromIndex > -1 && fromIndex !== toIndex) {
//       const panes = [].concat(this.snapshot.panes); // copy
//       panes.splice(toIndex, 0, panes.splice(fromIndex, 1)[0]);
//       this.updatePanes(panes);
//     }
//   }
//
//   select(pane: PaneComponent | null) {
//     if (pane !== this.snapshot.selectedPane && (pane === null || this.snapshot.panes.indexOf(pane) > -1)) {
//       this.snapshot.selectedPane = pane;
//       this.selectedPaneSubject.next(pane);
//     }
//   }
//
//   close() {
//     this.select(null);
//   }
//
//
//   private updatePanes(panes: PaneComponent[]) {
//     this.panesSubject.next(panes);
//   }
// }
