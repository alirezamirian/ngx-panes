import {Observable} from 'rxjs/Observable';


export abstract class SearchProvider {

  abstract getName(): string;

  abstract search(query: string): Observable<SearchResult[]>;

}

export interface SearchResult {
  text: string;
  description: string;
  score: number;
  url?: string;
}

export interface ProviderSearchResult extends SearchResult {
  provider: string;
}
