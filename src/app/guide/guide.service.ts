import {Injectable} from '@angular/core';
import {GuideModel, guides} from './guides';

@Injectable()
export class GuideService {

  constructor() {
  }

  getById(id: string): GuideModel | undefined {
    return guides.find(demo => demo.metadata.id === id);
  }

  getAll(): Array<GuideModel> {
    return [].concat(guides);
  }
}
