import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Demo} from '../demo/demos/demos';
import {Guide} from '../guide/guides';
import {map} from 'rxjs/operators';

interface Content {
  demos: Array<Demo>;
  guides: Array<Guide>;
}

@Injectable()
export class ContentService {
  private content$: Observable<Content>;

  constructor(private httpClient: HttpClient) {
  }

  getContents(): Observable<Content> {
    return this.getContentObservable();
  }

  getDemos(): Observable<Array<Demo>> {
    return this.getContentObservable().pipe(map<Content, Demo[]>(assets => assets.demos));
  }

  getGuides(): Observable<Array<Guide>> {
    return this.getContentObservable().pipe(map<Content, Guide[]>(assets => assets.guides));
  }

  private getContentObservable() {
    if (!this.content$) {
      this.content$ = this.httpClient.get<Content>('assets/content.json');
    }
    return this.content$;
  }
}
