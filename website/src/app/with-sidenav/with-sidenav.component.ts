import {Component, OnInit} from '@angular/core';
import {GuideModel, guides} from '../guide/guides';
import {Observable} from 'rxjs/Observable';
// workaround for importing all guides
import '../guide/guides/index';
import {ApiDocsService} from '../core/api-docs.service';
import {map} from 'rxjs/operators';

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
    this.apiDocs$ = this.apiDocsService.getDocs().pipe(
      map(docs => {
        const modules = docs.filter(doc => doc.type === 'ngModule').map(module => {
          const allDirectives = docs.filter(doc => {
            return doc.type === 'directive' && module.declarations.indexOf(getFqn(doc)) > -1;
          });
          const services = docs.filter(doc => {
            return doc.type === 'service' && module.services.indexOf(getFqn(doc)) > -1;
          });
          const components = allDirectives.filter(directive => directive.isComponent);
          const directives = allDirectives.filter(directive => !directive.isComponent);
          return Object.assign({}, module, {services, components, directives});
        });
        const types = docs.filter(doc => ['ngModule', 'directive', 'service'].indexOf(doc.type) < 0);
        return {modules, types};
      })
    );
  }
}

function getFqn(doc) {
  return `${doc.fileName.replace(/\.[^/.]+$/, '')}#${doc.identifier}`;
}
