import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ApiDocsService {
  private docs$: any;

  constructor(private http: Http) {
  }

  getDocs(): Observable<any> {
    if (!this.docs$) {
      this.docs$ = this.http.get('assets/api-docs.json').share().map(response => {
        return response.json();
      });
    }
    this.docs$.subscribe(docs => console.log('docs', docs));
    return this.docs$;
  }

  /**
   * Returns promise for the doc objects with the specified symbol, which is basically an
   * exported symbol (className for directives and services). In normal course of events, this
   * is a single item list. If more than one exported symbol exists for that symbol, doc
   * object for all of them are returned.
   *
   * @param {string} symbol
   * @param {string} moduleResolution: filters exported symbols to include only ones exported from an es6 module
   * specified by moduleResolution.
   *
   * @usage:
   *
   * apiDocsService.getDocItem('PanesComponent');
   * apiDocsService.getDocItem('PanesComponent', 'lib/pane/pane.component.ts');
   *
   * @returns {Promise<any>}
   */
  getDocItem(symbol: string, moduleResolution?: string) {
    return this.getDocs().toPromise().then(docs => docs.filter(doc => doc.identifier === symbol));
  }

}
