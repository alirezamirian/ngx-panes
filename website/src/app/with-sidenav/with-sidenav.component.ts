import {Component, OnInit} from '@angular/core';
import {GuideModel, guides} from '../guide/guides';
import {Observable} from 'rxjs/Observable';
// workaround for importing all guides
import '../guide/guides/index';
import {ApiDocsService} from '../core/api-docs.service';

@Component({
  selector: 'app-with-sidenav',
  templateUrl: './with-sidenav.component.html',
  styleUrls: ['./with-sidenav.component.scss']
})
export class WithSidenavComponent implements OnInit {
  apiDocs$: Observable<any>;
  guides: GuideModel[];

  constructor(private apiDocsService: ApiDocsService) {
  }

  ngOnInit() {
    this.guides = guides;
    // TODO: extract a service for apiDocs
    this.apiDocs$ = this.apiDocsService.getDocs();
  }

}
