import {Injectable} from '@angular/core';
import {DemoMeta, DemoModel, demos} from './demos/demos';
import {ContentService} from '../core/content.service';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

/**
 * Created by alireza on 5/26/17.
 */

@Injectable()
export class DemoService {
  constructor(private contentSerice: ContentService) {

  }

  getDemoById(id: string): Observable<DemoModel | null> {
    return this.contentSerice.getDemos().pipe(map(demoMetas => {
      const demoModel = demos.find(demo => demo.metadata.id === id);
      return demoModel ? new DemoModel(demoModel.component, demoMetas.find(demo => demo.id === id)) : null;
    }));
  }

  getDemos(): Array<DemoModel> {
    return [].concat(demos);
  }
}
