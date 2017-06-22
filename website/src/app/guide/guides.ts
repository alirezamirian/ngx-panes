/**
 * Created by alireza on 5/26/17.
 */
import {Type} from '@angular/core';


interface Guide {
  /**
   * Defines an identifier to be used by router to the guide at /guides/{id}
   */
  id: string;
  /**
   * Defines an string to be used as the title of guide guide (in guide list page)
   */
  title: string;
  /**
   * Defines an additional piece of information to be shown as a description for guide
   */
  description?: string;

}

export class GuideModel {
  constructor(private _component: Type<{}>, private _metadata: Guide) {
  }

  get component(): Type<{}> {
    return this._component;
  }

  get metadata(): Guide {
    return this._metadata;
  }
}

class DuplicateGuideError extends Error {
}

export const guides: Array<GuideModel> = [];

export function Guide(guide: Guide) {
  return function (guideComponent: Type<{}>) {
    if (guides.find(aGuide => aGuide.metadata.id === guide.id)) {
      throw new DuplicateGuideError(`A guide with id ${guide.id} is already declared`);
    }
    guides.push(new GuideModel(guideComponent, guide));
  };
}

