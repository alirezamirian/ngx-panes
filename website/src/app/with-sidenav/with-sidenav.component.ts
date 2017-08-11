import {Component, OnInit} from '@angular/core';
import {GuideModel, guides} from '../guide/guides';

import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
// workaround for importing all guides
import '../guide/guides/index';

@Component({
  selector: 'app-with-sidenav',
  templateUrl: './with-sidenav.component.html',
  styleUrls: ['./with-sidenav.component.scss']
})
export class WithSidenavComponent implements OnInit {
  apiDocs$: Observable<any>;
  guides: GuideModel[];

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.guides = guides;
    // TODO: extract a service for apiDocs
    this.apiDocs$ = this.http.get('assets/api-docs.json').map(response => {
      const apiDocs = response.json();
      return Object.keys(apiDocs).map(directiveName => ({...apiDocs[directiveName], type: 'directive'}));
    });
  }

}
