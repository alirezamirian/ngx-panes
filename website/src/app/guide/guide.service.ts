import {Injectable} from '@angular/core';
import {GuideModel, guides} from './guides';
import {sortBy} from 'lodash';

@Injectable()
export class GuideService {

  constructor() {
  }

  getById(id: string): GuideModel | undefined {
    return guides.find(guide => guide.metadata.id === id);
  }

  getAll(): Array<GuideModel> {
    return [].concat(sortBy<GuideModel>(guides, guide => guide.metadata.order));
  }
}
