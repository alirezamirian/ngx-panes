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
        const apiDocs = response.json();
        return Object.keys(apiDocs).map(directiveName => ({...apiDocs[directiveName], type: 'directive'}));
      });
    }
    return this.docs$;
  }

  getDocByClassName(className: string) {
    return this.getDocs().toPromise().then(docs => docs.filter(doc => doc.className === className)[0]);
  }

}
