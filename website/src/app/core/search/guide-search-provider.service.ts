import {SearchProvider, SearchResult} from './search-provider';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ContentService} from '../content.service';
import {map} from 'rxjs/operators';
import {Guide} from '../../guide/guides';
import {TypedFuseOptions} from './typed-fuse-options.interface';
import * as Fuse from 'fuse.js';

const fuseOptions: TypedFuseOptions<Guide> = {
  includeScore: true,
  keys: [{
    name: 'title',
    weight: 1
  }, {
    name: 'description',
    weight: .3
  }]
};

@Injectable()
export class GuideSearchProviderService extends SearchProvider {

  constructor(private contentService: ContentService) {
    super();
  }

  getName(): string {
    return 'Guide';
  }

  search(query: string): Observable<SearchResult[]> {
    return this.contentService.getGuides().pipe(map<Guide[], SearchResult[]>(guides => {
      return new Fuse(guides, <Fuse.FuseOptions>fuseOptions).search<any>(query).map<SearchResult>(result => ({
        text: result.item.title,
        description: result.item.description,
        url: `/guides/${result.item.id}`,
        score: result.score
      }));
    }));
  }
}
