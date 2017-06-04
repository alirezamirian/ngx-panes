import {Injectable} from '@angular/core';
import {DemoModel, demos} from './demos/demos';
/**
 * Created by alireza on 5/26/17.
 */

@Injectable()
export class DemoService {
  constructor() {

  }

  getDemoById(id: string): DemoModel | undefined {
    return demos.find(demo => demo.metadata.id === id);
  }

  getDemos(): Array<DemoModel> {
    return [].concat(demos);
  }
}
