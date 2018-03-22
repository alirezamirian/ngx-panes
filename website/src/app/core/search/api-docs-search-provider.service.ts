import {SearchProvider, SearchResult} from './search-provider';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {ApiDocsService} from '../api-docs.service';
import {DocItemBase} from '../doc-item';
import {SimplifyDescriptionPipe} from '../../api-docs/simplify-description.pipe';
import {TypedFuseOptions} from './typed-fuse-options.interface';
import * as Fuse from 'fuse.js';


const fuseOptions: TypedFuseOptions<DocItemBase> = {
  includeScore: true,
  keys: [{
    name: 'identifier',
    weight: .9
  }, {
    name: 'description',
    weight: .1
  }]
};


@Injectable()
export class ApiDocsSearchProviderService extends SearchProvider {

  constructor(private apiDocsService: ApiDocsService, private simplifyDescription: SimplifyDescriptionPipe) {
    super();
  }

  getName(): string {
    return 'API Docs';
  }

  search(query: string): Observable<SearchResult[]> {
    return this.apiDocsService.getDocs().pipe(map<DocItemBase[], SearchResult[]>(docs => {
      return new Fuse(docs, <Fuse.FuseOptions>fuseOptions).search<any>(query).map<SearchResult>(result => ({
        text: result.item.identifier,
        description: this.simplifyDescription.transform(result.item.description),
        url: `/api/${result.item.identifier}`,
        score: result.score
      }));
    }));
  }
}
