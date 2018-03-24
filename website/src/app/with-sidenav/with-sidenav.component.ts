import {Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import {Guide} from '../guide/guides';
// workaround for importing all guides
import '../guide/guides/index';
import {ApiDocsService} from '../core/api-docs.service';
import {catchError, map, share} from 'rxjs/operators';
import {Demo} from '../demo/demos/demos';
import {HttpClient} from '@angular/common/http';
import {ContentService} from '../core/content.service';

@Component({
  selector: 'app-with-sidenav',
  templateUrl: './with-sidenav.component.html',
  styleUrls: ['./with-sidenav.component.scss']
})
export class WithSidenavComponent implements OnInit {
  private docs: { modules: any[]; types: any[] } = {modules: [], types: []};

  @HostBinding('class.hidden-sidenav')
  private hidden: boolean;

  @ViewChild('index', {read: ElementRef})
  private sidenav: ElementRef;
  guides: Array<Guide>;
  private demos: Array<Demo>;

  constructor(private apiDocsService: ApiDocsService,
              private httpClient: HttpClient,
              private contentService: ContentService) {
  }

  ngOnInit() {
    this.contentService.getContents().pipe(catchError(e => {
      console.error('could not fetch list of demos and guides!');
      return [];
    })).subscribe(content => {
      this.demos = content.demos;
      this.guides = content.guides;
    });

    this.apiDocsService.getDocs().pipe(
      share(),
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
    ).subscribe(docs => {
      this.docs = docs;
    });
  }

  hideSidenav() {
    setTimeout(() => {
      this.hidden = true;
    });
  }

  showSidenav() {
    setTimeout(() => {
      this.hidden = false;
    });
  }
}

function getFqn(doc) {
  return `${doc.fileName.replace(/\.[^/.]+$/, '')}#${doc.identifier}`;
}
