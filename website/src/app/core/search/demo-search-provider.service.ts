import {SearchProvider, SearchResult} from './search-provider';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ContentService} from '../content.service';
import {map} from 'rxjs/operators';
import {Demo} from '../../demo/demos/demos';
import * as Fuse from 'fuse.js';
import {TypedFuseOptions} from './typed-fuse-options.interface';

const fuseOptions: TypedFuseOptions<Demo> = {
  includeScore: true,
  keys: [{
    name: 'title',
    weight: 1
  }, {
    name: 'tags',
    weight: .7,
  }, {
    name: 'description',
    weight: .3
  }]
};

@Injectable()
export class DemoSearchProviderService extends SearchProvider {

  constructor(private contentService: ContentService) {
    super();
  }

  getName(): string {
    return 'Demo';
  }

  search(query: string): Observable<SearchResult[]> {
    return this.contentService.getDemos().pipe(map<Demo[], SearchResult[]>(demos => {
      return new Fuse(demos, <Fuse.FuseOptions>fuseOptions).search<any>(query).map<SearchResult>(result => ({
        text: result.item.title,
        description: result.item.description,
        url: `/demos/${result.item.id}`,
        score: result.score
      }));
    }));
  }
}
