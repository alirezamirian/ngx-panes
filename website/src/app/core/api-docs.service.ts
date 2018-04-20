import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {map, shareReplay} from 'rxjs/operators';
import {DocItemBase} from './doc-item';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ApiDocsService {
  private docs$: any;

  constructor(private http: HttpClient) {
  }

  getDocs(includeInternals?: boolean): Observable<DocItemBase[]> {
    if (!this.docs$) {
      this.docs$ = this.http.get('assets/api-docs.json').pipe(
        shareReplay(),
        map(convertLinksRecursive),
        map(addFqns)
      );
    }
    if (!includeInternals) {
      return this.docs$.pipe(map((docs: DocItemBase[]) => {
        const modules = docs.filter(doc => doc.type === 'ngModule');
        const exports = docItem => module => module.exports.some(declaration => docItem.fqn === declaration);
        return docs.filter(doc => !isDeclaration(doc) || modules.some(exports(doc)));
      }));
    }
    return this.docs$;
  }

  /**
   * Returns promise for the doc objects with the specified symbol, which is basically an
   * exported symbol (className for directives and injectables). In normal course of events, this
   * is a single item list. If more than one exported symbol exists for that symbol, doc
   * object for all of them are returned.
   *
   * @param {string} symbol
   * @param {string} moduleResolution: filters exported symbols to include only ones exported from an es6 module
   * specified by moduleResolution.
   *
   * @usage:
   *
   * apiDocsService.getDocItem('PaneComponent');
   * apiDocsService.getDocItem('PaneComponent', 'lib/pane/pane.component.ts');
   *
   * @returns {Promise<any>}
   */
  getDocItem(symbol: string, moduleResolution?: string) {
    return this.getDocs().toPromise().then(docs => docs.filter(doc => doc.identifier === symbol));
  }

}


/**
 * adds FQN (Fully Qualified Name) to each do item
 * @param {DocItemBase[]} docItems
 * @returns {{type?: string; identifier: string; description: string; fileName: string; [p: string]: any; fqn: string}[]}
 */
function addFqns(docItems: DocItemBase[]) {
  return docItems.map(docItem => ({...docItem, fqn: getFqn(docItem)}));
}

function convertLinksRecursive(docItem) {
  if (Array.isArray(docItem)) {
    return docItem.map(convertLinksRecursive);
  } else if (typeof docItem === 'object') {
    const result = {};
    Object.keys(docItem).forEach(key => {
      const includedProperties = ['description'];
      if (typeof docItem[key] === 'string' && includedProperties.indexOf(key) > -1) {
        result[key] = convertLinks(docItem[key]);
      } else {
        result[key] = convertLinksRecursive(docItem[key]);
      }
    });
    return result;
  } else {
    return docItem;
  }
}

function convertLinks(html) {
  return html.replace(/{@link (.*?)(\#(.*?))?( (.*?))?}/g, (whole, identifier, ignored, property, ignored2, linkText) => {
    return `<a href="/api/${identifier}${property ? ('#' + property) : ''}">${linkText || property || identifier}</a>`;
  });
}


export function getFqn(doc: DocItemBase) {
  return `${doc.fileName.replace(/\.[^/.]+$/, '')}#${doc.identifier}`;
}

export function isDeclaration(doc: DocItemBase) {
  return doc.type === 'directive' || doc.type === 'pipe';
}
