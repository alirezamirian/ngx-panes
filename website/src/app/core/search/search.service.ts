import {Inject, Injectable} from '@angular/core';
import {ProviderSearchResult, SearchProvider, SearchResult} from './search-provider';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';
import 'rxjs/add/operator/merge';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {sortBy} from 'lodash';
import {from} from 'rxjs/observable/from';

@Injectable()
export class SearchService {

  // Note that @Inject is required in JIT mode.
  // See https://github.com/angular/angular/issues/18020#issuecomment-317486330
  constructor(@Inject(SearchProvider) private providers: SearchProvider[]) {
  }

  search(query: string): Observable<ProviderSearchResult[]> {
    if (!query) {
      return from([[]]);
    }
    return combineLatest(this.providers.map(provider =>
      provider.search(query).pipe(map<SearchResult[], ProviderSearchResult[]>(searchResults => {
        return searchResults.map<ProviderSearchResult>((searchResult: SearchResult) =>
          ({...searchResult, provider: provider.getName()}));
      }))), (...resultSets) => {
      return sortBy(resultSets.reduce((soFar, resultSet) => [...soFar, ...resultSet], []), item => item.score);
    });
  }
}
