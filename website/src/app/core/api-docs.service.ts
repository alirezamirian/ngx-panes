import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/share';

@Injectable()
export class ApiDocsService {

  constructor(private http: Http) {
  }

  getDocs() {
    return this.http.get('assets/api-docs.json').map(response => {
      const apiDocs = response.json();
      return Object.keys(apiDocs).map(directiveName => ({...apiDocs[directiveName], type: 'directive'}));
    }).share();
  }

}
